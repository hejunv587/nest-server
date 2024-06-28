// role.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleDTO } from './dto/role.dto';
import { generateCustomID } from '../utils/customId.service';
// import { AppHttpCode } from '../common/code.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRoleWithHierarchy(roleDTO: RoleDTO): Promise<Role> {
    return await this.roleRepository.manager.transaction(
      async (transactionalEntityManager) => {
        let parent: Role | null = null;
        let parentLevel = 0;

        console.log('roleDTO.parentRoleId', roleDTO.parentRoleId);
        if (roleDTO.parentRoleId) {
          // 当有传入parentRoleId, 先去数据库中确认是否能够找到对应的role记录
          parent = await this.roleRepository.findOne({
            where: {
              roleId: roleDTO.parentRoleId,
              gap: 0,
            },
          });

          console.log('parent', parent);

          if (!parent) {
            throw new Error('角色不存在');
          }

          parentLevel = parent.currentLevel || 0;

          const tableCode = 'aae'; // 表编号,aae代表roleid
          roleDTO.roleId = generateCustomID(tableCode); //生成一个roleid
          roleDTO.currentLevel = parentLevel + 1;
          roleDTO.parentRoleId = roleDTO.roleId;
          roleDTO.gap = 0;
          const newRole = this.roleRepository.create(roleDTO);
          await transactionalEntityManager.save(newRole);

          if (parent) {
            await this.createParentHierarchy(
              transactionalEntityManager,
              parent,
              roleDTO,
            );
          }

          return newRole;
        } else {
          // 当没有父角色的时候,默认要创建level 0的最高层role
          const tableCode = 'aae'; // 表编号,aae代表roleid
          roleDTO.roleId = generateCustomID(tableCode); //生成一个roleid
          roleDTO.currentLevel = 0;
          roleDTO.parentRoleId = roleDTO.roleId;
          roleDTO.gap = 0;
          const newRole = this.roleRepository.create(roleDTO);
          await this.roleRepository.save(newRole);
          return newRole;
        }
      },
    );
  }

  // private async createParentHierarchy(
  //   entityManager: EntityManager,
  //   parent: Role,
  //   roleDTO: RoleDTO,
  // ): Promise<void> {
  //   roleDTO.parentRoleId = parent.roleId;
  //   roleDTO.gap = roleDTO.gap + 1;
  //   const parentHierarchy = this.roleRepository.create(roleDTO);

  //   await entityManager.save(parentHierarchy);

  //   if (parent.parentRoleId) {
  //     parent = await this.roleRepository.findOne({
  //       where: {
  //         roleId: roleDTO.parentRoleId,
  //         gap: 1,
  //       },
  //     });
  //     if (parent) {
  //       await this.createParentHierarchy(entityManager, parent, roleDTO);
  //     }
  //   }
  // }

  private async createParentHierarchy(
    entityManager: EntityManager,
    parent: Role,
    roleDTO: RoleDTO,
  ): Promise<void> {
    const originalRoleId = roleDTO.roleId; // 保存原始roleId
    let currentParent = parent;
    let currentGap = 1; // 初始gap为1
  
    // while (currentParent.parentRoleId && currentParent.parentRoleId !== roleDTO.roleId) {
    while (currentParent.parentRoleId) {
      console.log('currentParent', currentParent); // 添加日志记录
      console.log('currentGap', currentGap); // 添加日志记录

      // roleDTO.roleId = generateCustomID('aae'); // 一直使用一个roleId
      roleDTO.parentRoleId = currentParent.parentRoleId; // 获取更高级的parentRoleId
      roleDTO.gap = currentGap; //更高的gap
  
      const parentHierarchy = this.roleRepository.create(roleDTO);
      await entityManager.save(parentHierarchy);
  
      currentParent = await this.roleRepository.findOne({
        where: {
          roleId: currentParent.parentRoleId,
          gap: 1,
        },
      });
      
      if (!currentParent) break; // 终止条件: 如果找不到父级，则退出循环
      if (currentParent.currentLevel == 0) break; // 终止条件
      currentGap += 1; // 增加gap
    }
  
    roleDTO.roleId = originalRoleId; // 恢复原始roleId
  }

  async getRoleById(id: string): Promise<Role | undefined> {
    return await this.roleRepository.findOneBy({ id });
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async getRolesByRoleId(roleId: string): Promise<Role[]> {
    return await this.roleRepository.findBy({ roleId });
  }

  async deleteRole(id: string): Promise<void> {
    const role = await this.roleRepository.findOneBy({ id });
    const roleId = role.roleId;

    const canDelete = await this.canDeleteRole(roleId);

    if (!canDelete) {
      throw new Error('Cannot delete role. Check failed.');
    }

    await this.roleRepository.delete(id);
  }

  async canDeleteRole(roleId: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({
      where: { parentRoleId: roleId, gap: 1 },
    });

    if (role) {
      return false; // 还存在下级role,返回false 不允许删除
    }

    // Add more business logic checks if needed

    return true; // Role can be safely deleted
  }
}

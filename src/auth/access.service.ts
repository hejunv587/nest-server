import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Access } from './entities/access.entity';
import { AccessDTO } from './dto/access.dto';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>,
  ) {}

  create(accessDTO: AccessDTO) {
    const access = this.accessRepository.create(
      accessDTO as DeepPartial<Access>,
    );
    return this.accessRepository.save(access);
  }

  async getAccessById(id: string): Promise<Access> {
    const access = await this.accessRepository.findOneBy({ id });
    if (!access) {
      throw new NotFoundException(`Access with ID ${id} not found.`);
    }
    return access;
  }

  async updateAccess(id: string, accessDTO: AccessDTO): Promise<Access> {
    await this.accessRepository.update(id, accessDTO);
    return this.getAccessById(id);
    // const access = await this.getAccessById(id); // Check if the access exists
    // access.parent = accessDTO.parent
    //   ? await this.accessRepository.findOneOrFail({
    //       where: {
    //         id: accessDTO.parent,
    //       },
    //     })
    //   : null;
    // return await this.accessRepository.save(accessDTO);
    // return await this.getAccessById(id);
  }

  async deleteAccess(id: string): Promise<void> {
    const access = await this.getAccessById(id); // Check if the access exists
    await this.accessRepository.remove(access);
  }
}

// profile-access.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileAccess } from './entities/profileaccess.entity';
import { ProfileAccessDTO } from './dto/profileaccess.dto';
import { Profile } from './entities/profile.entity';
import { Access } from './entities/access.entity';

@Injectable()
export class ProfileAccessService {
  constructor(
    @InjectRepository(ProfileAccess)
    private readonly profileAccessRepository: Repository<ProfileAccess>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>,
  ) {}

  async createProfileAccess(profileAccessDTO: ProfileAccessDTO) {
    const newProfileAccess = new ProfileAccess();
    newProfileAccess.profile = await this.profileRepository.findOneBy({
      id: profileAccessDTO.profile,
    });
    newProfileAccess.access = await this.accessRepository.findOneBy({
      id: profileAccessDTO.access,
    });
    return await this.profileAccessRepository.save(newProfileAccess);
  }

  async getProfileAccessById(id: string): Promise<ProfileAccess | undefined> {
    return await this.profileAccessRepository.findOneBy({ id });
  }

  async getAllProfileAccesses(): Promise<ProfileAccess[]> {
    return await this.profileAccessRepository.find();
  }

  async getAccessesByProfileId(profileId: string) {
    const profileAccesses = await this.profileAccessRepository.find({
      where: { profileId },
    });

    // const profileAccesses = await this.profileAccessRepository
    //   .createQueryBuilder('pa')
    //   .leftJoinAndSelect('pa.access', 'access')
    //   .where('pa.profileId = :id', { id: profileId })
    //   .getMany();

    const accesses = profileAccesses.map((pa) => pa.access);

    return accesses;
  }

  async deleteProfileAccess(id: string): Promise<void> {
    await this.profileAccessRepository.delete(id);
  }
}

// profile.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(profileDTO: ProfileDto): Promise<Profile> {
    const newProfile = this.profileRepository.create(profileDTO);
    return await this.profileRepository.save(newProfile);
  }

  async getProfileById(id: string): Promise<Profile | undefined> {
    return await this.profileRepository.findOneBy({ id });
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileRepository.find();
  }

  async updateProfile(
    id: string,
    profileDTO: ProfileDto,
  ): Promise<Profile | undefined> {
    await this.profileRepository.update(id, profileDTO);
    return this.getProfileById(id);
  }

  async deleteProfile(id: string): Promise<void> {
    await this.profileRepository.delete(id);
  }
}

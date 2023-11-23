// profile-access.dto.ts
import { IsNotEmpty } from 'class-validator';

export class ProfileAccessDTO {
  @IsNotEmpty({ message: 'Access ID is required' })
  access: string;

  @IsNotEmpty({ message: 'Profile ID is required' })
  profile: string;
}

import { Module } from '@nestjs/common';
import { ProjectfileService } from './projectfile.service';
import { ProjectfileController } from './projectfile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectFile } from './entities/projectfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectFile])],
  controllers: [ProjectfileController],
  providers: [ProjectfileService],
})
export class ProjectfileModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectfileDto } from './create-projectfile.dto';

export class UpdateProjectfileDto extends PartialType(CreateProjectfileDto) {}

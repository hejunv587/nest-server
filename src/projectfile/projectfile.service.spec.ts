import { Test, TestingModule } from '@nestjs/testing';
import { ProjectfileService } from './projectfile.service';

describe('ProjectfileService', () => {
  let service: ProjectfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectfileService],
    }).compile();

    service = module.get<ProjectfileService>(ProjectfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

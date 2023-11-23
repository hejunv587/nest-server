import { Test, TestingModule } from '@nestjs/testing';
import { ProjectfileController } from './projectfile.controller';
import { ProjectfileService } from './projectfile.service';

describe('ProjectfileController', () => {
  let controller: ProjectfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectfileController],
      providers: [ProjectfileService],
    }).compile();

    controller = module.get<ProjectfileController>(ProjectfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

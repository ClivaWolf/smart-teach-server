import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from '../roles.controller';
import { RolesService } from '../roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';

describe('RolesController', () => {
  let controller: RolesController;
  let mockRolesService;

  beforeEach(async () => {
    mockRolesService = {
      getRoleByValue: jest.fn(),
      create: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: mockRolesService
        }
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

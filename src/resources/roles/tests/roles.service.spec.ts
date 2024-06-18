import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/resources/users/entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';

describe('RolesService', () => {
  let service: RolesService;

  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      findOneBy: jest.fn(),
      find: jest.fn(),
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockRepository,
        }
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a role', async () => {
      const createRoleDto = new CreateRoleDto();
      const expectedResult = {...createRoleDto, id: 1 };
      mockRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createRoleDto);
      expect(result).toEqual(expectedResult);
      expect(mockRepository.save).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('getRoleByValue', () => {
    it('should return a role by value', async () => {
      const value = 'ADMIN';
      const expectedResult = { id: '1', value };
      mockRepository.findOneBy.mockResolvedValue(expectedResult);
    
      const result = await service.getRoleByValue(value);
      expect(result).toEqual(expectedResult);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ value });
    });
  });
});

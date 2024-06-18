import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { RolesService } from 'src/resources/roles/roles.service';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: Partial<Record<keyof Repository<UserEntity>, jest.Mock>>;
  let mockRolesService: Partial<Record<keyof RolesService, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    mockRolesService = {
      getRoleByValue: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const expectedResult = { id: '1', email };
      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findByEmail(email);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findById', () => {
    it('should return a user by id including roles', async () => {
      const id = '1';
      const expectedResult = { id, roles: [] };
      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findById(id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findByLogin', () => {
    it('should return a user by login including roles', async () => {
      const login = 'test_login';
      const expectedResult = { login, roles: [] };
      mockRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findByLogin(login);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedResult = [{ id: '1' }, { id: '2' }];
      mockRepository.find.mockResolvedValue(expectedResult);

      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { name: 'John Doe', email: 'john.doe@example.com', login: 'john_doe', password: 'password' };
      const role = { value: 'USER' };
      const expectedResult = {...createUserDto, roles: [role] };
      mockRepository.create.mockReturnValue(createUserDto);
      mockRolesService.getRoleByValue.mockResolvedValue(role);
      mockRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createUserDto);
      expect(result).toEqual(expectedResult);
    });
  });
});

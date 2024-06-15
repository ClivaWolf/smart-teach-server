import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      findOneBy: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const email = 'test@example.com';
      const expectedResult = { id: 1, email };
      mockRepository.findOneBy.mockResolvedValue(expectedResult);

      const result = await service.findByEmail(email);
      expect(result).toEqual(expectedResult);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email });
    });
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const id = '1';
      const expectedResult = { id, name: 'Test User' };
      mockRepository.findOneBy.mockResolvedValue(expectedResult);

      const result = await service.findById(id);
      expect(result).toEqual(expectedResult);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('findByLogin', () => {
    it('should return a user if found', async () => {
      const login = 'testlogin';
      const expectedResult = { id: 1, login };
      mockRepository.findOneBy.mockResolvedValue(expectedResult);

      const result = await service.findByLogin(login);
      expect(result).toEqual(expectedResult);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ login });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedResult = [{ id: 1 }, { id: 2 }];
      mockRepository.find.mockResolvedValue(expectedResult);

      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should save a new user', async () => {
      const createUserDto = new CreateUserDto();
      const expectedResult = {...createUserDto, id: 1 };
      mockRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createUserDto);
      expect(result).toEqual(expectedResult);
      expect(mockRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });
});

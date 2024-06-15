import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService;

  beforeEach(async () => {
    mockUsersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByLogin: jest.fn(),
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = new CreateUserDto();
      const expectedResult = {...createUserDto, id: 1 };
      mockUsersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(expectedResult);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedResult = [{ id: 1 }, { id: 2 }];
      mockUsersService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const id = '1';
      const expectedResult = { id, name: 'Test User' };
      mockUsersService.findById.mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(mockUsersService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('findByLogin', () => {
    it('should return a user by login', async () => {
      const login = 'testlogin';
      const expectedResult = { id: 1, login };
      mockUsersService.findByLogin.mockResolvedValue(expectedResult);

      const result = await controller.findByLogin(login);
      expect(result).toEqual(expectedResult);
      expect(mockUsersService.findByLogin).toHaveBeenCalledWith(login);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const expectedResult = { id: 1, email };
      mockUsersService.findByEmail.mockResolvedValue(expectedResult);

      const result = await controller.findByEmail(email);
      expect(result).toEqual(expectedResult);
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
    });
  });
});

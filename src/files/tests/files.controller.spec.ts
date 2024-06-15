import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from '../files.controller';
import { FilesService } from '../files.service'; // Убедитесь, что путь к файлу сервиса указан правильно
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [FilesController],
      providers: [
        JwtService,
        FilesService,
        {
          provide: getRepositoryToken(FileEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

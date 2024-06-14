import { Test } from '@nestjs/testing';
import { FilesService } from '../files.service';
import { FileEntity } from '../entities/file.entity';
import { CreateFileDto } from '../dto/create-file.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: getRepositoryToken(FileEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<FilesService>(FilesService);
  });

  describe('create', () => {
    it('should call the create method', async () => {
      expect(service.create({} as CreateFileDto)).toBe('This action adds a new file');
    });
  });

  describe('findAll', () => {
    it('should return all files', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });
});

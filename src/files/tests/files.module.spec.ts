import { Test, TestingModule } from '@nestjs/testing';
import { FilesModule } from '../files.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';

describe('FilesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [FilesModule],
    })
   .overrideProvider(getRepositoryToken(FileEntity)) // Мокаем репозиторий
   .useValue({}) // Значение мока, можно заменить на объект с нужными методами
   .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });
});

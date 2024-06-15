import { Test, TestingModule } from '@nestjs/testing';
import { FilesModule } from '../files.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { JwtService } from '@nestjs/jwt';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

describe('FilesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    const jwtServiceMock = {
      // Здесь вы можете добавить моки для методов JwtService, если это необходимо
    };

    module = await Test.createTestingModule({
      imports: [FilesModule],
    })
   .overrideProvider(getRepositoryToken(FileEntity))
   .useValue({})
   .overrideProvider(JwtService)
   .useValue(jwtServiceMock)
   .overrideGuard(JWTAuthGuard)
   .useValue({}) // Здесь вы можете предоставить мок-реализацию JWTAuthGuard, если это необходимо
   .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });
});

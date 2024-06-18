import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getRepositoryToken(RolesGuard),
          useValue: {
            can: jest.fn().mockReturnValue(true),
          }
        },
        {
          provide: getRepositoryToken(Reflector),
          useValue: {
            get: jest.fn().mockReturnValue(true),
          }
        },
        {
          provide: JwtService, // Мок JwtService
          useValue: {}, // Здесь должны быть моки для методов JwtService, если они используются в RolesGuard
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

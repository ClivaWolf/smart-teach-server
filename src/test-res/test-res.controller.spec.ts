import { Test, TestingModule } from '@nestjs/testing';
import { TestResController } from './test-res.controller';
import { TestResService } from './test-res.service';

describe('TestResController', () => {
  let controller: TestResController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestResController],
      providers: [TestResService],
    }).compile();

    controller = module.get<TestResController>(TestResController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TestResService } from './test-res.service';

describe('TestResService', () => {
  let service: TestResService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestResService],
    }).compile();

    service = module.get<TestResService>(TestResService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { TestResService } from './test-res.service';
import { TestResController } from './test-res.controller';

@Module({
  controllers: [TestResController],
  providers: [TestResService],
})
export class TestResModule {}

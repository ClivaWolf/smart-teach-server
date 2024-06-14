import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestResModule } from './test-res/test-res.module';

@Module({
  imports: [TestResModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

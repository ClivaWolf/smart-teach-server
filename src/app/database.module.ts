import { Module } from '@nestjs/common';
import { TypeOrmConfig } from './type-orm.config';

@Module({
  providers: [TypeOrmConfig],
  exports: [TypeOrmConfig],
})
export class DatabaseModule {}
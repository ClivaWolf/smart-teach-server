import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  exports: [RolesService],
})
export class RolesModule {}

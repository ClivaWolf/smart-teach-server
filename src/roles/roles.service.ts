import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private repository: Repository<RoleEntity>,
  ) { }
  create(createRoleDto: CreateRoleDto) {
    return this.repository.save(createRoleDto);
  }

  getRoleByValue(value: string) {
    return this.repository.findOneBy({ value });
  }
}

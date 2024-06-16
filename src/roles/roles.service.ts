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
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.repository.save(createRoleDto);
    return role
  }

  async getRoleByValue(value: string) {
    const role = await this.repository.findOneBy({ value });
    return role
  }
}

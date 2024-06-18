import { HttpException, Injectable } from '@nestjs/common';
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
    const roleAlreadyExist = await this.repository.findOneBy({ value: createRoleDto.value });
    if (roleAlreadyExist) {
      throw new HttpException('Роль с таким значением уже существует', 400);
    }
    const role = await this.repository.save(createRoleDto);
    if (!role) {
      throw new HttpException('Роль не создана', 400);
    }
    return role
  }

  async getRoleByValue(value: string): Promise<RoleEntity> {
    const role = await this.repository.findOneBy({ value });
    if (!role) {
      throw new HttpException('Роль не найдена', 400);
    }
    return role
  }
}

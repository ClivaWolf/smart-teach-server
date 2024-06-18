import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private roleService: RolesService
  ) { }

  async findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string) {
    const user = await this.repository.findOne({
      where: {id: id},
      relations: ['roles'],
    })
    return user;
  }

  async findByLogin(login: string) {
    const user = await this.repository.findOne({
      where: {login: login},
      relations: ['roles'],
    })
    return user;
  }

  async findAll() {
    return this.repository.find();
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.repository.create(createUserDto);
    const role = await this.roleService.getRoleByValue('USER');
    user.roles = [role];
    return this.repository.save(user);
  }
}

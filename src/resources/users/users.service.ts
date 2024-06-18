import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/resources/roles/roles.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private roleService: RolesService
  ) { }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['roles']
    });

    if (!user) {
      throw new HttpException('Пользователь с таким email не существует', 400);
    }
    return user
  }

  async findById(id: string) {
    if (!id||!isUUID(id)) {
      throw new HttpException('Неверный id', 400);
    }
    const user = await this.repository.findOne({
      where: { id: id },
      relations: ['roles'],
    })

    if (!user) {
      throw new HttpException('Пользователь с таким id не существует', 400);
    }
    return user;
  }

  async findByLogin(login: string) {
    const user = await this.repository.findOne({
      where: { login: login },
      relations: ['roles'],
    })

    if (!user) {
      throw new HttpException('Пользователь с таким именем не существует', 400);
    }
    return user;
  }

  async findAll() {
    const users = await this.repository.find();

    if (!users) {
      throw new HttpException('Пользователей не существует', 400);
    }
    return users
  }

  async create(createUserDto: CreateUserDto) {
    await this.loginAlreadyExist(createUserDto.login);
    await this.emailAlreadyExist(createUserDto.email);

    const user = await this.repository.create(createUserDto);
    const role = await this.roleService.getRoleByValue('USER');
    user.roles = [role];
    return this.repository.save(user);
  }

  private async loginAlreadyExist(login: string) {
    const user = await this.repository.findOne({
      where: { login: login }
    })
    if (user) {
      throw new HttpException('Пользователь с таким именем уже существует', 400);
    }
  }

  private async emailAlreadyExist(email: string) {
    const user = await this.repository.findOne({
      where: { email: email }
    })
    if (user) {
      throw new HttpException('Пользователь с таким email уже существует', 400);
    }
  }
}

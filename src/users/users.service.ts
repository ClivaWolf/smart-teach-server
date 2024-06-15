import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) { }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findByLogin(login: string) {
    return this.repository.findOneBy({ login });
  }

  async findAll() {
    return this.repository.find();
  }

  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }
}

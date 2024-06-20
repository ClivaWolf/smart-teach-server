import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/resources/roles/roles.service';
import { isUUID } from 'class-validator';
import { CreateProfileDto, UpdateProfileDto } from './dto/update-profile.dto';
import { AboutUserEntity } from './entities/about-user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private roleService: RolesService,
    @InjectRepository(AboutUserEntity)
    private profileRepository: Repository<AboutUserEntity>
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
    if (!id || !isUUID(id)) {
      throw new HttpException('Неверный id', 400);
    }
    const user = await this.repository.findOne({
      where: { id: id },
      relations: ['roles', 'aboutUser'],
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
      throw new HttpException('Пользователя с таким логином не существует', 400);
    }
    return user;
  }

  async findAllDeprecated() {
    const users = await this.repository.find();

    if (!users) {
      throw new HttpException('Пользователей не существует', 400);
    }
    return users
  }

  async findAll(page: number, limit: number): Promise<{ items: UserEntity[], total: number }> {
    if (page < 1 || limit < 1) {
      throw new HttpException('Неверные параметры', 400);
    }
    if (limit > 25) {
      limit = 25
    }

    const skip = (page - 1) * limit;
    const users = await this.repository.findAndCount({
      take: limit,
      skip,
      relations: ['roles'], // Укажите здесь другие отношения, если они есть
    });
    return { items: users[0], total: users[1] };
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
      throw new HttpException('Пользователь с таким логином уже существует', 400);
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

  async fieldAlreadyExist(field: string, value: string) {
    const user = await this.repository.findOne({
      where: { [field]: value }
    })
    if (user) {
      throw new HttpException('Пользователь с таким значением поля уже существует', 400);
    }
    return `${field} is available`
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('Пользователь с таким id не существует', 404);
    }

    let aboutUser = user.aboutUser;
    if (!aboutUser) {
      aboutUser = await this.profileRepository.create(updateProfileDto);
      user.aboutUser = aboutUser
      await this.repository.save(user);
    } else {
      const updatedAboutUser = updateOnlyChangedFields(aboutUser, updateProfileDto);
      await this.profileRepository.save(updatedAboutUser);
      user.aboutUser = updatedAboutUser;
    }

    return user;
  }

  async getProfile(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('Пользователь с таким id не существует', 404);
    }
    return user.aboutUser
  }

}

function updateOnlyChangedFields<T>(currentEntity: T, newData: Partial<T>): T {
  const result: Partial<T> = {};

  // console.log(newData);
  for (const key in currentEntity) {
    if (newData.hasOwnProperty(key) && newData[key] !== undefined) {
      result[key] = newData[key];
    } else {
      result[key] = currentEntity[key];
    }
  }

  return result as T;
}
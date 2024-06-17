import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(login: string, pass: string,): Promise<{ access_token: string }> {
    const user = await this.usersService.findByLogin(login);
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль, проверьте правильность ввода');
    }
    if (user.password !== pass) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return this.generateToken(user);
  }

  async register(user: CreateUserDto): Promise<{ access_token: string }> {
    const newUser: UserEntity = await this.usersService.create(user);
    if (!newUser) {
      throw new ForbiddenException('Такой пользователь уже существует');
    }
    return await this.generateToken(newUser)
  }

  async generateToken(user: UserEntity): Promise<{ access_token: string }> {
    const payload = { sub: user.id, login: user.login, roles: user.roles };
    console.log(payload)
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

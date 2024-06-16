import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    login: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByLogin(login);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const payload = { sub: user.id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);
    if (!newUser) {
      throw new ForbiddenException('Такой пользователь уже существует');
    }
    const payload = { sub: newUser.id, login: newUser.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

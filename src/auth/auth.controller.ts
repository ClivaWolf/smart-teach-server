import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/resources/users/dto/create-user.dto';
import { JWTRefreshGuard } from './guards/refresh.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateUserDto
  })
  @ApiOperation({ summary: 'Login', description: 'method for sign in by login and password' })
  @Post('login')
  //TODO: rename
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @ApiBody({
    type: CreateUserDto
  })
  @ApiOperation({ summary: 'Register', description: 'method for sign up by login, email and password' })
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Refresh token', description: 'method for refresh token' })
  @UseGuards(JWTRefreshGuard)
  
  @Post('refresh')
  refresh(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
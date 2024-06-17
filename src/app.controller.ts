import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from './decorators/user-roles.decorator';
import { RolesGuard } from './auth/guards/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get hello', deprecated: true })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/for-admin')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get hello for admin' })
  @ApiBearerAuth()
  getHelloForAdmin(): string {
    return 'Hello for admin';
  }

  @Get('/for-user')
  @Roles('USER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get hello for user' })
  @ApiBearerAuth()
  getHelloForUser(): string {
    return 'Hello for admin';
  }
}

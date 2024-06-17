import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create user', deprecated: true })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'method for get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get user by id', description: 'method for get user by id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('login/:login')
  @ApiOperation({ summary: 'Get user by login', description: 'method for get user by login' })
  findByLogin(@Param('login') login: string) {
    return this.usersService.findByLogin(login);
  }
  
  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email', description: 'method for get user by email' })
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
  
  @Get('/me')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Get current user', description: 'method for get current user' })
  @ApiBearerAuth()
  getMe(@UserId() id: string) {
    return this.usersService.findById(id);
  }
}

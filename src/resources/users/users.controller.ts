import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

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
  
  @Get('/v0')
  @ApiOperation({ summary: 'Get all users', description: 'method for get all users', deprecated: true })
  findAll() {
    return this.usersService.findAllDeprecated();
  }

  @Get()
  @ApiOperation({ summary: 'Get array of users by page and limit', description: 'method for get array of users' })
  @ApiProperty({ example: { items: [], total: 0 }, description: 'Array of users' })
  async getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    return await this.usersService.findAll(page, limit);
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

  @Get('/check-field')
  @ApiOperation({ summary: 'Check field', description: 'method for check field' })

  checkField(
    @Query('field') field: string, 
    @Query('value') value: string) {
    return this.usersService.fieldAlreadyExist(field, value);
  }

  @Patch('/update-profile')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Update user', description: 'method for update user' })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateProfileDto })
  updateProfile(@UserId() id: string, @Body() UpdateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(id, UpdateProfileDto);
  }

  @Get('/my-profile')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Get user profile', description: 'method for get user profile' })
  @ApiBearerAuth()
  getProfile(@UserId() id: string) {
    return this.usersService.getProfile(id);
  }

  @Get('/public-profile/:login')
  @ApiOperation({ summary: 'Get public user profile', description: 'method for get public user profile' })
  getPublicProfile(@Param('login') login: string) {
    return this.usersService.getPublicProfile(login);
  }

  @Get('/my-files')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Get user files', description: 'method for get user files' })
  @ApiBearerAuth()
  getMyFiles(@UserId() id: string) {
    return this.usersService.getMyFiles(id);
  }
}

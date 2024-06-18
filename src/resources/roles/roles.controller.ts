import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}


  @Post()
  @ApiOperation({ summary: 'Create role', description: 'method for create role' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('/:val')
  @ApiOperation({ summary: 'Get role by value', description: 'method for get role by value' })
  getRoleByValue(@Param('val') val: string) {
    return this.rolesService.getRoleByValue(val)
  }
}

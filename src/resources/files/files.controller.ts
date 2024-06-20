import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {  fileStorage } from './storage';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserLogin } from 'src/decorators/user-login.decorator';

@Controller('files')
@UseGuards(JWTAuthGuard)
@ApiTags('files')
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get()
  @ApiOperation({ summary: 'Get all files', description: 'method for get all files', deprecated: true })
  findAll() {
    return this.filesService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    }
  })
  @ApiOperation({ summary: 'Upload file', description: 'method for upload file' })
  create(
    @UploadedFile() file: Express.Multer.File,
    @UserId() userId: string,
    @UserLogin() login: string,
    @Body() dto: CreateFileDto
  ) {
    return this.filesService.create(file, userId, login, dto);
  }
}

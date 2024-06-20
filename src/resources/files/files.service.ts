import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}
  createDep(file: Express.Multer.File, userId: string, dto: CreateFileDto) {
    return this.repository.save({
      ...dto,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId }
    })
  }

  async create(file: Express.Multer.File, userId: string, login: string, dto: CreateFileDto) {
    // Определяем путь к директории для файла пользователя
    console.log(userId, login)
    const directoryPath = `uploads/${login}`;
  
    // Гарантируем, что директория существует
    await fs.ensureDir(directoryPath);
  
    // Формируем полный путь к файлу, учитывая директорию пользователя
    const filePath = `${directoryPath}/${file.filename}`;
  
    console.log(filePath)

    // Копируем файл в директорию пользователя
    await fs.copy(file.path, filePath);
  
    // Сохраняем информацию о файле в базе данных
    return this.repository.save({
     ...dto,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: filePath, // Добавляем путь к файлу
      uploadedBy: login,
      user: { id: userId }
    });
  }

  findAll() {
    return this.repository.find();
  }
}

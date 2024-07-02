import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({ credentials: true, origin: true });// Включение CORS
  app.useGlobalPipes(new ValidationPipe())// Валидация
  app.useLogger(new Logger()); // Инициализация логгера

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));// раздача статики

  const config = new DocumentBuilder()
    .setTitle('Smart teach swagger API')
    .setDescription('The smart-teach API description')
    .setVersion('1.0')
    .addBearerAuth(
      {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'},
      'access-token'
    )
    .addBearerAuth(
      {type: 'http', scheme: 'bearer', bearerFormat: 'JWT'},
      'refresh-token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  await app.listen(process.env.PORT || 4321);
}
bootstrap();

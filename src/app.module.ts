import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmConfig } from './type-orm.config';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    FilesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, DatabaseModule], // Указываем DatabaseModule в imports
      useFactory: async (configService: ConfigService, typeOrmConfig: TypeOrmConfig) => {
        return typeOrmConfig.createConnectionOptions();
      },
      inject: [ConfigService, TypeOrmConfig],
    }),
    UsersModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

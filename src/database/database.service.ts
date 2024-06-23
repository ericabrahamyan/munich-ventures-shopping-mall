import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get('DB_URL'),
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
      migrations: ['dist/database/migrations/*.js'],
      entities: ['dist/**/*.entity.js'],
      migrationsRun: true,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseConfig {
  constructor(private readonly configService: ConfigService) {}

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const isDevelopment =
      this.configService.get<string>('NODE_ENV') !== 'production';

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST') || 'localhost',
      port: this.configService.get<number>('DB_PORT') || 5432,
      username: this.configService.get<string>('DB_USERNAME') || 'postgres',
      password: this.configService.get<string>('DB_PASSWORD') || 'postgres',
      database: this.configService.get<string>('DB_DATABASE') || 'nestjs_auth',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      synchronize: isDevelopment,
      logging: this.configService.get<boolean>('DB_LOGGING') || false,
      ssl: this.configService.get<boolean>('DB_SSL')
        ? { rejectUnauthorized: false }
        : false,
      migrationsRun: false,
      migrationsTableName: 'migrations',
      migrationsTransactionMode: 'each',
      extra: {
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
        max: 20,
        min: 2,
      },
    };
  }

  getDataSourceOptions(): DataSourceOptions {
    const config = this.getTypeOrmConfig();

    return {
      ...config,
      // override paths for source usage
      migrations: ['src/migrations/*{.ts,.js}'],
      entities: ['src/**/*.entity{.ts,.js}'],
    } as DataSourceOptions;
  }
}

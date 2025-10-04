import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config(); // load .env

// Instantiate ConfigService manually
const configService = new ConfigService();

// Determine environment
const isDevelopment =
  configService.getOrThrow<string>('NODE_ENV') !== 'production';

// Build DataSource options directly
const dataSourceOptions = {
  type: 'postgres' as const,
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USERNAME'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_DATABASE'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: isDevelopment,
  logging: configService.getOrThrow<boolean>('DB_LOGGING'),
  ssl: configService.getOrThrow<boolean>('DB_SSL')
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
} as DataSourceOptions;

// Export DataSource instance
export const AppDataSource = new DataSource(dataSourceOptions);

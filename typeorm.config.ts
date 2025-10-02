import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/common/configs/database.config';

export const AppDataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ['src/migrations/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
});
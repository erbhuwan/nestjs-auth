import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DatabaseConfig } from 'src/common/configs/database/database.config';

config();

// Instantiate ConfigService manually
const configService = new ConfigService();

// Create DatabaseConfig instance
const dbConfig = new DatabaseConfig(configService);

export const AppDataSource = new DataSource(dbConfig.getDataSourceOptions());

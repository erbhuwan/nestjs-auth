import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isDevelopment =
          configService.getOrThrow<string>('NODE_ENV') !== 'production';

        return {
          type: 'postgres',
          host: configService.getOrThrow<string>('DB_HOST'),
          port: configService.getOrThrow<number>('DB_PORT'),
          username: configService.getOrThrow<string>('DB_USERNAME'),
          password: configService.getOrThrow<string>('DB_PASSWORD'),
          database: configService.getOrThrow<string>('DB_DATABASE'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/migrations/*{.ts,.js}'],
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
        };
      },
    }),
  ],
})
export class DatabaseModule {}

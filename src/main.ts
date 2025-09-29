import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger, Logger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'],
      prefix: 'NestJs Auth',
      timestamp: true,
    }),
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') ?? 3000;

  await app.listen(port);
  logger.log(`Application started: http://localhost:${port}`);
}

void bootstrap();

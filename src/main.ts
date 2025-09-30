import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { HELMET_CONFIG } from './common/configs/helmet.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet(HELMET_CONFIG));

  const logger = app.get(Logger);

  app.useLogger(logger);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') ?? 3000;

  await app.listen(port);
  logger.log(`Application started: http://localhost:${port}`);
}

void bootstrap();

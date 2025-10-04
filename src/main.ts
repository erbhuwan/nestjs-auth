import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { HELMET_CONFIG } from './common/configs/helmet.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VERSION } from './common/constants/version.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet(HELMET_CONFIG));

  const logger = app.get(Logger);

  app.useLogger(logger);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('NestJS Auth API')
    .setDescription('Authentication API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`v${VERSION.V1}/docs`, app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') ?? 3000;

  await app.listen(port);
  logger.log(`Application started: http://localhost:${port}`);
  logger.log(
    `Swagger documentation available at: http://localhost:${port}/v${VERSION.V1}/docs`,
  );
}

void bootstrap();

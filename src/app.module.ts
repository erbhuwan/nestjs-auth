import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { join } from 'path';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          pinoHttp: {
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            genReqId: (request) =>
              request.headers['x-correlation-id'] || uuidv4(),
            transport: {
              targets: [
                {
                  target: 'pino-pretty', // Console output
                  options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                  },
                },
                {
                  target: 'pino-roll',
                  options: {
                    file: join(__dirname, '..', 'logs', 'app.log'),
                    frequency: 'daily', // Rotate daily
                    size: '10M', // Max size per file
                    maxFiles: 30, // Keep logs for 30 days
                    mkdir: true, // Create directory if it doesn't exist
                  },
                },
              ],
            },
            redact: ['req.headers.authorization'],
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

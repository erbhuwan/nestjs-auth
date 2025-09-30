import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { join } from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { Request } from 'express';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          pinoHttp: {
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',

            genReqId: (req) => req.headers['x-correlation-id'] || uuidv4(),

            customLogLevel: (_, res, err) => {
              if (err || res.statusCode >= 500) return 'error';
              if (res.statusCode >= 400) return 'warn';
              return 'info';
            },
            serializers: {
              req: (req: IncomingMessage & Request) => ({
                id: req.id,
                method: req.method,
                url: req.url,
                query: req.query,
                params: req.params,
                remoteAddress: req.socket?.remoteAddress,
                remotePort: req.socket?.remotePort,
              }),
              res: (res: ServerResponse) => ({
                statusCode: res.statusCode,
              }),
            },
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
                  target: 'pino-roll', // file output
                  options: {
                    file: join(__dirname, '..', 'logs', 'app.log'),
                    frequency: 'daily',
                    size: '10M',
                    maxFiles: 30,
                    mkdir: true,
                  },
                },
              ],
            },
            redact: ['req.headers.authorization', 'req.headers.cookie'],
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRoot({
      errorMessage() {
        return 'Too many requests!';
      },
      throttlers: [
        {
          ttl: 60 * 1000,
          limit: 100,
        },
      ],
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

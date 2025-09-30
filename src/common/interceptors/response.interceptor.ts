import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/common/types/api-response.type';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;
    const startTime = Date.now();

    return next.handle().pipe(
      map((data: T & { message?: string; data?: T; meta?: unknown }) => {
        // Calculate duration in ms
        const duration = Date.now() - startTime;

        return {
          statusCode,
          success: true,
          message: data?.message ?? 'Success',
          data: data?.data ?? data ?? null,
          errors: null,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          apiVersion: request?.url?.split('/')[1],
          duration,
          meta: data?.meta ?? null,
        } as ApiResponse<T>;
      }),
    );
  }
}

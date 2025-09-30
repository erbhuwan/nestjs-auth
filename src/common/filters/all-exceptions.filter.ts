import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiError, ApiResponse } from '../types/api-response.type';
import { Request, Response } from 'express';

interface HttpExceptionResponse {
  message?: string | string[];
  error?: string;
  [key: string]: unknown; // for any other properties
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();
    const startTime = Date.now();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal server error';
    let errors: ApiError[] | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const r = res as HttpExceptionResponse;
        if (Array.isArray(r.message)) {
          message = 'Validation failed';
          errors = r.message.map((msg) => ({ message: msg }));
        } else if (typeof r.message === 'string') {
          message = r.message;
        }
      }
    } else if (exception instanceof Error) {
      message =
        exception.message && exception.message.trim() !== ''
          ? exception.message
          : 'Internal server error';
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const duration: number = Date.now() - startTime;

    const errorResponse: ApiResponse<null> = {
      statusCode: status,
      success: false,
      message,
      data: null,
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      apiVersion: request.url.split('/')[1] ?? 'v1',
      duration,
      meta: null,
    };

    response.status(status).json(errorResponse);
  }
}

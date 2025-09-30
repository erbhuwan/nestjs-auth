import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HTTPLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    // const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      //   const duration = Date.now() - startTime;
      const msg = `${method} ${originalUrl} ${statusCode}`;

      this.logger.log(msg);
    });
    next();
  }
}

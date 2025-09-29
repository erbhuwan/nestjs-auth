import { Controller, Get, HttpStatus, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('1')
  getHello() {
    const data = this.appService.getHello();
    return {
      statusCode: HttpStatus.OK,
      data: data,
      errors: null,
    };
  }
}

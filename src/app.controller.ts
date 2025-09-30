import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { VERSION } from './common/constants/version.constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version(VERSION.V1)
  getHello() {
    const data = this.appService.getHello();
    return data;
  }
}

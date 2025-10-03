import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { VERSION } from './common/constants/version.constant';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version(VERSION.V1)
  @ApiOperation({ summary: 'Get welcome message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a welcome message',
    schema: {
      type: 'string',
      example: 'Hello World!',
    },
  })
  getHello() {
    const data = this.appService.getHello();
    return data;
  }
}

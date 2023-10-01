import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';

import { AppService } from './app.service';
import { JsonData } from '@core/concerns/model/baseModel.controller';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck(@Res() response: Response): JsonData {
    return response
      .header('Content-Type', 'application/json')
      .status(HttpStatus.OK)
      .send({ status: 'ok', host: this.appService.hostInfo() });
  }
}

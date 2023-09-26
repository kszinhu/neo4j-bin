import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';

import { AppService } from './app.service';
import { JsonData } from 'core/concerns/base.controller';
import { ServiceException } from 'core/concerns/base.service';

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

  @Get('database/health')
  async database(@Res() response: Response): Promise<JsonData> {
    return this.appService
      .ogmHealthCheck()
      .then((databaseInfo) =>
        response
          .header('Content-Type', 'application/json')
          .status(HttpStatus.OK)
          .send(databaseInfo),
      )
      .catch((error: ServiceException) =>
        response
          .header('Content-Type', 'application/json')
          .status(error.code)
          .send({ error }),
      );
  }
}

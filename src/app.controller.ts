import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';
import { JsonData } from 'core/concerns/base.controller';
import { ServiceException } from 'core/concerns/base.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck(@Res() response: Response): JsonData {
    return response.status(HttpStatus.OK).json({ message: 'OK' });
  }

  @Get('database/health')
  async database(@Res() response: Response): Promise<JsonData> {
    return this.appService
      .ogmHealthCheck()
      .then((amount) => response.status(HttpStatus.OK).json({ nodes: amount }))
      .catch((error: ServiceException) =>
        response.status(error.code).json(error.cause),
      );
  }
}

import { Controller, Get } from '@nestjs/common';
import { OGM } from 'ogm-neo4j/app';

import { OGMService } from './core/database/ogm-neo4j/ogm.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  #ogm: OGM;

  constructor(
    private readonly appService: AppService,
    private readonly ogmService: OGMService,
  ) {
    this.#ogm = ogmService.ogm;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ogm')
  async getOGM(): Promise<string> {
    return this.appService.getOGMHello(this.#ogm);
  }
}

import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';

import { OGM } from 'ogm-neo4j/app';
import { NEO4J_DRIVER } from './ogm.constants';

@Injectable()
export class OGMService implements OnApplicationShutdown {
  app: OGM;

  constructor(@Inject(NEO4J_DRIVER) private readonly ogm: OGM) {
    this.app = ogm;
  }

  onApplicationShutdown() {
    this.app.close();
  }
}

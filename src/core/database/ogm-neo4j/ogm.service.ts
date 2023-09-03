import { Inject, Injectable } from '@nestjs/common';

import { OGM } from 'ogm-neo4j/app/index';
import { NEO4J_CONFIG } from './ogm.constants';
import { Model } from 'ogm-neo4j/models/index';

@Injectable()
export class OGMService {
  ogm: OGM;

  constructor(@Inject(NEO4J_CONFIG) private readonly config) {
    this.ogm = OGM.fromEnv();
  }
}

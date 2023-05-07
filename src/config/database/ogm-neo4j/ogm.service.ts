import { Inject, Injectable } from '@nestjs/common';

import OGM from 'ogm-neo4j';
import { NEO4J_CONFIG } from './ogm.constants';

@Injectable()
export class OGMService {
  _ogm: OGM;

  constructor(@Inject(NEO4J_CONFIG) private readonly config) {
    this._ogm = OGM.fromEnv();
  }

  getOGM(): OGM {
    return this._ogm;
  }
}

import { Injectable } from '@nestjs/common';

import { BaseModelService } from 'core/concerns/model';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

import type { EventModel } from './event.interface';

@Injectable()
export class EventsService extends BaseModelService<EventModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Event');
  }
}

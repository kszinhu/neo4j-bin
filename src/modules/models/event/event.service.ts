import { Injectable } from '@nestjs/common';
import type { EventModel } from './event.interface';
import { BaseService } from 'core/concerns/base.service';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

@Injectable()
export class EventsService extends BaseService<EventModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Event');
  }
}

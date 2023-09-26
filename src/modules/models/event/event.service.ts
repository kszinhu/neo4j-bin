import { Injectable } from '@nestjs/common';
import type { EventModel } from './event.interface';
import { BaseModelService } from 'core/concerns/model/baseModel.service';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

@Injectable()
export class EventsService extends BaseModelService<EventModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Event');
  }
}

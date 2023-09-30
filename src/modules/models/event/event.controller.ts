import { Controller } from '@nestjs/common';

import { BaseModelController } from 'core/concerns/model/baseModel.controller';
import { EventsService } from './event.service';
import { Event } from './event.dto';

@Controller('events')
export class EventsController extends BaseModelController<Event, 'id'> {
  constructor(private readonly eventService: EventsService) {
    super(eventService);
  }
}

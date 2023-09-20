import { Controller } from '@nestjs/common';
import { Event } from './event.interface';
import { BaseController } from 'core/concerns/base.controller';
import { EventsService } from './event.service';

@Controller('events')
export class EventsController extends BaseController<Event, 'time'> {
  constructor(private readonly eventService: EventsService) {
    super(eventService);
  }
}

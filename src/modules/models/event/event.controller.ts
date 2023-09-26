import { Controller } from '@nestjs/common';
import { Event } from './event.interface';
import { BaseModelController } from 'core/concerns/model/baseModel.controller';
import { EventsService } from './event.service';

@Controller('events')
export class EventsController extends BaseModelController<Event, 'time'> {
  constructor(private readonly eventService: EventsService) {
    super(eventService);
  }
}

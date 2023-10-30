import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BaseModelController } from 'core/concerns/model/base.controller';

import { Event } from './event.interface';
import { EventsService } from './event.service';
import { EventSerializer } from './event.serializer';

@Controller('events')
export class EventsController extends BaseModelController<Event, 'time'> {
  constructor(
    private readonly eventService: EventsService,
    private readonly configService: ConfigService,
  ) {
    super(eventService, new EventSerializer(configService));
  }
}

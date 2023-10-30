import { BaseSerializer } from 'core/concerns/model';

import { Event } from './event.interface';
import { ConfigService } from '@nestjs/config';

export class EventSerializer extends BaseSerializer<Event> {
  constructor(private readonly configService: ConfigService) {
    super('events', configService, { idKey: 'time' });
  }
}

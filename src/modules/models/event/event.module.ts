import { Module } from '@nestjs/common';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

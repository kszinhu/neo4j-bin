import { Module } from '@nestjs/common';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';
import { DatabaseModule } from '@core/database/database.module';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [DatabaseModule],
})
export class EventsModule {}

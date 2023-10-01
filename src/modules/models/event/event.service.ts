import { Injectable, NotImplementedException } from '@nestjs/common';
import { type Event, eventSchema } from './event.dto';
import { DatabaseService } from '@core/database/database.service';
import { BaseModelService } from '@core/concerns/model';
import { $Enums as Enums } from '@prisma/client';

@Injectable()
export class EventsService extends BaseModelService<'event', Event, 'id'> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'event', eventSchema);
  }

  get(id: number): Promise<{
    id: number;
    time: Date;
    kind: Enums.EventKind;
    user_session: string;
    user_id: number;
    product_id: number;
  }> {
    throw new NotImplementedException();
  }

  delete(id: number): Promise<{
    id: number;
    time: Date;
    kind: Enums.EventKind;
    user_session: string;
    user_id: number;
    product_id: number;
  }> {
    throw new NotImplementedException();
  }
}

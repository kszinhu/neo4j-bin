import { Injectable } from '@nestjs/common';
import { BaseModelService } from 'core/concerns/model/baseModel.service';
import { DatabaseService } from 'core/database/database.service';
import { User, userSchema } from './user.dto';

@Injectable()
export class UsersService extends BaseModelService<'user', User, 'id'> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'user', userSchema);
  }
}

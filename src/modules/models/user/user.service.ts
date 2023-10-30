import { Injectable } from '@nestjs/common';
import { BaseModelService } from 'core/concerns/model';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

import type { UserModel } from './user.interface';

@Injectable()
export class UsersService extends BaseModelService<UserModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'User');
  }
}

import { Injectable } from '@nestjs/common';
import type { UserModel } from './user.interface';
import { BaseModelService } from 'core/concerns/model/baseModel.service';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

@Injectable()
export class UsersService extends BaseModelService<UserModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'User');
  }
}

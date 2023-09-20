import { Injectable } from '@nestjs/common';
import type { UserModel } from './user.interface';
import { BaseService } from 'core/concerns/base.service';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

@Injectable()
export class UsersService extends BaseService<UserModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'User');
  }
}

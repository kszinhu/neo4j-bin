import { BaseSerializer } from 'core/concerns/model';

import { User } from './user.interface';
import { ConfigService } from '@nestjs/config';

export class UserSerializer extends BaseSerializer<User> {
  constructor(private readonly configService: ConfigService) {
    super('users', configService);
  }
}

import { Controller } from '@nestjs/common';
import { User } from './user.interface';
import { BaseModelController } from 'core/concerns/model/base.controller';
import { UsersService } from './user.service';
import { UserSerializer } from './user.serializer';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController extends BaseModelController<User, 'id'> {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super(userService, new UserSerializer(configService));
  }
}

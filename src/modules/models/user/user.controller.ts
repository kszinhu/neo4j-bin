import { Controller } from '@nestjs/common';
import { User } from './user.interface';
import { BaseController } from 'core/concerns/base.controller';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController extends BaseController<User, 'id'> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }
}

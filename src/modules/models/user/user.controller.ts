import { Controller } from '@nestjs/common';
import { User } from './user.interface';
import { BaseModelController } from 'core/concerns/model/baseModel.controller';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController extends BaseModelController<User, 'id'> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }
}

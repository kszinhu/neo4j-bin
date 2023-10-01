import { Controller } from '@nestjs/common';
import { User } from './user.dto';
import { BaseModelController } from '@core/concerns/model';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController extends BaseModelController<User, 'id'> {
  constructor(private readonly userService: UsersService) {
    super(userService);
  }
}

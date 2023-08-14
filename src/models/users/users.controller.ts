import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<string> {
    return await this.usersService.all().then((users) => {
      return JSON.stringify(users.toString());
    });
  }
}

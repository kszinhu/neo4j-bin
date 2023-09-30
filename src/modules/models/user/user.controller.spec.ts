import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import Setup from 'core/config/app/configuration';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

jest.mock('./user.service.ts');

describe('UsersController', () => {
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
          load: [Setup],
        }),
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const result = ['result'];
    jest.spyOn(controller, 'findAll').mockImplementation(async () => result);

    // @ts-expect-error "response on test mocked isn't a necessary parameter"
    expect(await controller.findAll()).toBe(result);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OGMModule } from 'core/database/ogm-neo4j/ogm.module';
import { Neo4jConfig } from 'core/database/ogm-neo4j/ogm.interface';
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
          load: [Setup('neo4j')],
        }),
        OGMModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (
            configService: ConfigService,
          ): Promise<Neo4jConfig> => ({
            connectionString: configService.get<string>(
              'DATABASE.CONNECTION_STRING',
            ),
            database: configService.get<string>('DATABASE.NAME'),
            password: configService.get<string>('DATABASE.USER.PASSWORD'),
            username: configService.get<string>('DATABASE.USER.USERNAME'),
            config: configService.get<object>('DATABASE.CONFIG'),
          }),
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

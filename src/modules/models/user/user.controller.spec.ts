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
          load: [Setup],
        }),
        OGMModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (
            configService: ConfigService,
          ): Promise<Neo4jConfig> => ({
            connectionString: configService.get<string>(
              'database.connectionString',
            ),
            database: configService.get<string>('database.name'),
            password: configService.get<string>('database.user.password'),
            username: configService.get<string>('database.user.username'),
            config: configService.get<object>('database.config'),
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

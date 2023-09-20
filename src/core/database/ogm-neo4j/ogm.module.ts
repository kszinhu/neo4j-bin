import { DynamicModule, Module } from '@nestjs/common';

import { OGMService } from './ogm.service';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './ogm.constants';
import { Neo4jConfig } from './ogm.interface';

import { OGM } from 'ogm-neo4j/app';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class OGMModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: OGMModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async ({
            connectionString,
            password,
            username,
            config,
          }: Neo4jConfig) =>
            await OGM.build(connectionString, username, password, config),
        },
        OGMService,
      ],
      exports: [OGMService],
    };
  }

  static forRootAsync(configProvider): DynamicModule {
    return {
      module: OGMModule,
      global: true,
      imports: [ConfigModule],
      providers: [
        {
          provide: NEO4J_CONFIG,
          ...configProvider,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async ({
            connectionString,
            password,
            username,
            database: _database,
            config,
          }: Neo4jConfig) =>
            await OGM.build(connectionString, username, password, config),
        },
        OGMService,
      ],
      exports: [OGMService],
    };
  }
}

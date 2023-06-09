import { DynamicModule, Module } from '@nestjs/common';

import { OGMService } from './ogm.service';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './ogm.constants';
import { Neo4jConfig } from './ogm.interface';

import OGM from 'ogm-neo4j';
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
            database,
            password,
            username,
            ...additionalConfig
          }: Neo4jConfig) =>
            new OGM(
              connectionString,
              database,
              username,
              password,
              additionalConfig,
            ),
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
            database,
            password,
            username,
            ...additionalConfig
          }: Neo4jConfig) =>
            new OGM(
              connectionString,
              database,
              username,
              password,
              additionalConfig,
            ),
        },
        OGMService,
      ],
      exports: [OGMService],
    };
  }
}

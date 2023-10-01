import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OGMModule } from 'core/database/ogm-neo4j/ogm.module';
import { Neo4jConfig } from 'core/database/ogm-neo4j/ogm.interface';
import { AppLoggerMiddleware } from 'core/middleware/logger';
import Setup from 'core/config/app/configuration';
import { Modules } from 'modules';
import { AppService } from './app.service';
import { AppController } from 'app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Setup('neo4j')] }),
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
    ...Modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

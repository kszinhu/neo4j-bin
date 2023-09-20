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
    ConfigModule.forRoot({ isGlobal: true, load: [Setup] }),
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

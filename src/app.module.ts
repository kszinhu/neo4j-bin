import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppLoggerMiddleware } from './core/middleware/logger';
import { DatabaseModule } from './core/database/database.module';
import Setup from './core/config/app/configuration';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Modules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Setup('postgres')] }),
    DatabaseModule,
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

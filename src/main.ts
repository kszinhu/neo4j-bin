import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { SwaggerInit } from 'core/config/app/swagger';
import { AppModule } from './app.module';

type Application = INestApplication & NestFastifyApplication;

async function bootstrap() {
  const app = await NestFactory.create<Application>(
    AppModule,
    new FastifyAdapter(),
  );

  SwaggerInit(app, {
    title: 'E-Commerce events API',
    description: 'API for analysis of E-Commerce events',
    version: '0.0.1',
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.get('APP_PORT') ?? 3000, '0.0.0.0');

  Logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();

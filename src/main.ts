import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type Application = INestApplication & NestFastifyApplication;

async function bootstrap() {
  const app = await NestFactory.create<Application>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);

  await app.listen(configService.get('APP_PORT') ?? 3000, '0.0.0.0');

  Logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();

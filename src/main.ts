import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger, INestApplication } from '@nestjs/common';

type Application = INestApplication & NestFastifyApplication;

async function bootstrap() {
  const app = await NestFactory.create<Application>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000, '0.0.0.0');

  Logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();

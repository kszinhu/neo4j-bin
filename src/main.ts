import { NestFactory } from '@nestjs/core';
import { Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type Application = INestApplication & NestFastifyApplication;

async function bootstrap() {
  const app = await NestFactory.create<Application>(
    AppModule,
    new FastifyAdapter(),
  );

  const swaggerConfig = new DocumentBuilder()
      .setTitle('E-Commerce events API')
      .setDescription('API for analysis of E-Commerce events')
      .setVersion('0.0.1')
      .build(),
    document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('APP_PORT') ?? 3000, '0.0.0.0');

  Logger.log(`Server running on ${await app.getUrl()}`);
}

bootstrap();

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface ISwaggerConfig {
  title: string;
  description: string;
  version: string;
  location?: string;
}

export default (app: INestApplication, config: ISwaggerConfig) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(config.location ?? 'docs', app, document);
};

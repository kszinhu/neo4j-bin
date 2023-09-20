import {
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  HttpStatus,
  Res,
  NotImplementedException,
} from '@nestjs/common';
import { FastifyReply as Response } from 'fastify';
import {
  ModelIdentifier,
  ProvidedPropertiesFactory as SchemaProperties,
} from 'ogm-neo4j/types/models';
import { Model } from 'ogm-neo4j/models';
import {
  EntityError,
  ModelError,
  TransactionError,
  ValidationError,
  SchemaError,
  OGMError,
} from 'ogm-neo4j/errors';

import { IBaseService } from './IBase.service';
import { ServiceException } from './base.service';

export type JsonData = Record<string, any>;

export class BaseController<
  Schema extends Record<string, any>,
  Identifier extends keyof Schema & string,
> {
  constructor(
    private readonly service: IBaseService<
      Model<Schema, SchemaProperties<keyof Schema & string, Identifier>>
    >,
  ) {}

  #handleError(error: OGMError): ServiceException {
    if (error instanceof EntityError) {
      return {
        code: HttpStatus.FAILED_DEPENDENCY,
        cause: { ...error, message: error.message },
      };
    } else if (error instanceof TransactionError) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        cause: { ...error, message: error.message },
      };
    } else if (error instanceof ModelError) {
      return {
        code: HttpStatus.BAD_REQUEST,
        cause: { ...error, message: error.message },
      };
    } else if (error instanceof ValidationError) {
      return {
        code: HttpStatus.BAD_REQUEST,
        cause: { ...error, message: error.message },
      };
    } else if (error instanceof SchemaError) {
      return {
        code: HttpStatus.BAD_REQUEST,
        cause: { ...error, message: error.message },
      };
    }

    return { code: HttpStatus.INTERNAL_SERVER_ERROR, cause: error };
  }

  @Get()
  async findAll(@Res() response: Response): Promise<JsonData> {
    return this.service
      .getAll()
      .then((entities) =>
        response
          .header('Content-Type', 'application/json')
          .status(HttpStatus.OK)
          .send(Object.fromEntries(entities)),
      )
      .catch((exception) => {
        const { code, cause: why } = this.#handleError(exception);

        return response
          .header('Content-Type', 'application/json')
          .status(code)
          .send(why);
      });
  }

  @Get(':id')
  async findById(
    @Param('id')
    id: ModelIdentifier<
      SchemaProperties<keyof Schema & string, Identifier>,
      Schema
    >,
    @Res() response: Response,
  ): Promise<JsonData> {
    return this.service
      .get(id)
      .then((entity) =>
        response
          .header('Content-Type', 'application/json')
          .status(HttpStatus.OK)
          .send(entity),
      )
      .catch((exception) => {
        const { code, cause: why } = this.#handleError(exception);

        return response
          .header('Content-Type', 'application/json')
          .status(code)
          .send(why);
      });
  }

  @Post()
  async create(
    @Body() entity: Schema,
    @Res() response: Response,
  ): Promise<JsonData> {
    return this.service
      .create(entity)
      .then((entity) => response.status(HttpStatus.OK).send(entity))
      .catch((exception) => {
        const { code, cause: why } = this.#handleError(exception);

        return response
          .header('Content-Type', 'application/json')
          .status(code)
          .send(why);
      });
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: ModelIdentifier<
      SchemaProperties<keyof Schema & string, Identifier>,
      Schema
    >,
    @Res() response: Response,
  ): Promise<JsonData> {
    return this.service
      .delete(id)
      .then(() => response.status(HttpStatus.NO_CONTENT))
      .catch((exception) => {
        const { code, cause: why } = this.#handleError(exception);

        return response
          .header('Content-Type', 'application/json')
          .status(code)
          .send(why);
      });
  }

  @Put()
  async update(@Body() entity: Schema): Promise<JsonData> {
    return NotImplementedException;
  }
}

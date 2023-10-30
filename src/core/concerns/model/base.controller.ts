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
  Query,
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

import { IBaseModelService } from './Ibase.service';
import { ServiceException } from './base.service';
import { BaseSerializer } from './base.serializer';
import { SerializerOptions } from 'ts-japi';

export type JsonData = Record<string, any>;
type PaginationMeta = { page: number; limit: number; total: number };

export type PaginationQueryParams = {
  page?: number;
  per?: number;
};
export type SerializationQueryParams = `fields[${string}]` | 'include';

export class BaseModelController<
  Schema extends Record<string, any>,
  Identifier extends keyof Schema & string,
> {
  protected pagination: PaginationMeta = { page: 1, limit: 10, total: 0 };
  protected serializationFields: (keyof Schema & string)[] = [];
  protected serializationOptions: Partial<SerializerOptions<Schema>> = {
    depth: 1,
    projection: undefined,
  };

  constructor(
    private readonly service: IBaseModelService<
      Model<Schema, SchemaProperties<keyof Schema & string, Identifier>>
    >,
    private readonly serializer: BaseSerializer<Schema>,
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

  #handlePagination(query: PaginationQueryParams): void {
    const { page, per } = query;

    this.pagination = {
      page: page ?? this.pagination.page,
      limit: per ?? this.pagination.limit,
      total: 0, // TODO: get total from service, and TODO: Implement total return from OGM
    };
  }

  #handleAttributes(query: Record<string, any>): void {
    const { include } = query;

    // get fields[<model>] from query and set { projection: { <model>: 0 } }
    // TODO: implement <model>: 1 for projection if has included but not fields
    this.serializationOptions.projection = Object.entries(query)
      .filter(([key]) => key.startsWith('fields['))
      .reduce((projection, [key, fields]) => {
        const model = key.replace('fields[', '').replace(']', '');

        this.serializationFields = fields.split(',') as (keyof Schema &
          string)[];

        return { ...projection, [model]: 0 };
      }, {});

    // each '.' in include is a depth level
    if (include) {
      this.serializationOptions.depth = include.split('.').length;
    }
  }

  #handleSerializerOptions(queryParams: Record<string, any>): void {
    this.#handlePagination(queryParams);
    this.#handleAttributes(queryParams);
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query() query: Record<string, any>,
  ): Promise<JsonData> {
    this.#handleSerializerOptions(query);

    return this.service
      .getAll(this.serializationFields)
      .then((entitiesRaw) =>
        this.serializer
          .serialize(
            Array.from(entitiesRaw.values()),
            this.serializationOptions,
          )
          .then((entities) =>
            response
              .header('Content-Type', 'application/json')
              .status(HttpStatus.OK)
              .send(entities),
          ),
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
    @Query() query: Record<string, any>,
  ): Promise<JsonData> {
    this.#handleSerializerOptions(query);

    return this.service
      .get(id)
      .then((entityRaw) =>
        this.serializer
          .serialize(
            [...entityRaw.values()][0] as unknown as Schema,
            this.serializationOptions,
          )
          .then((entity) =>
            response
              .header('Content-Type', 'application/json')
              .status(HttpStatus.OK)
              .send(entity),
          ),
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
    @Query() query: Record<string, any>,
  ): Promise<JsonData> {
    this.#handleSerializerOptions(query);

    return this.service
      .create(entity)
      .then((entityRaw) =>
        this.serializer
          .serialize(entityRaw as unknown as Schema, this.serializationOptions)
          .then((entity) =>
            response
              .header('Content-Type', 'application/json')
              .status(HttpStatus.OK)
              .send(entity),
          ),
      )
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
    @Query() query: Record<string, any>,
  ): Promise<JsonData> {
    this.#handleSerializerOptions(query);

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

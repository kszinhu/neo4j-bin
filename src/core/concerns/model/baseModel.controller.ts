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

import { IBaseModelService } from './IBaseModel.service';
import { ServiceException } from './baseModel.service';

export type JsonData = Record<string, any>;

export class BaseModelController<
  T extends Record<string, any>,
  I extends keyof T,
> {
  constructor(private readonly service: IBaseModelService<T, I>) {}

  #handleError(error: any): ServiceException {
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
          .send(entities),
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
    id: T[I],
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
    @Body() entity: T,
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
    id: T[I],
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
  async update(
    @Param('id')
    id: T[I],
    @Body() data: Partial<T>,
    @Res() response: Response,
  ) {
    return this.service
      .update(id, data)
      .then((entity) => response.status(HttpStatus.OK).send(entity))
      .catch((exception) => {
        const { code, cause: why } = this.#handleError(exception);

        return response
          .header('Content-Type', 'application/json')
          .status(code)
          .send(why);
      });
  }
}

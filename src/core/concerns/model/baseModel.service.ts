import { HttpStatus } from '@nestjs/common';
import { DatabaseService } from '@core/database/database.service';

import { IBaseModelService } from './IBaseModel.service';
import { JsonData } from './baseModel.controller';
import { Prisma, PrismaClient } from '@prisma/client';
import { ZodSchema } from 'zod';

export interface ServiceException {
  code: HttpStatus;
  cause: JsonData;
}

export class BaseModelService<
  T extends Lowercase<Prisma.ModelName>,
  EntitySchema extends Record<string, any>,
  I extends keyof EntitySchema,
> implements IBaseModelService<EntitySchema, I>
{
  readonly name: keyof DatabaseService;
  #entityRepository: PrismaClient[T];
  #schema: ZodSchema<EntitySchema>;

  constructor(
    service: DatabaseService,
    name: keyof DatabaseService,
    schema: ZodSchema<EntitySchema>,
  ) {
    this.name = name;
    this.#entityRepository = service[name] as PrismaClient[T];
    this.#schema = schema;
  }

  getAll(): Promise<EntitySchema[]> {
    // @ts-expect-error - There is no way to infer the type of repository
    return this.#entityRepository.findMany();
  }

  get(id: EntitySchema[I]): Promise<EntitySchema> {
    // @ts-expect-error - There is no way to infer the type of repository
    return this.#entityRepository.findUnique({ where: { id } });
  }

  create(data: Partial<EntitySchema>): Promise<EntitySchema> {
    this.#schema.parse(data);
    // @ts-expect-error - There is no way to infer the type of repository
    return this.#entityRepository.create({ data });
  }

  delete(id: EntitySchema[I]): Promise<EntitySchema> {
    // @ts-expect-error - There is no way to infer the type of repository
    return this.#entityRepository.delete({ where: { id } });
  }

  update(
    id: EntitySchema[I],
    data: Partial<EntitySchema>,
  ): Promise<EntitySchema> {
    // @ts-expect-error - There is no way to infer the type of repository
    return this.#entityRepository.update({ where: { id }, data });
  }
}

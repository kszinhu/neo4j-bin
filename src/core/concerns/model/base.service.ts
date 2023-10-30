import { BadGatewayException, HttpStatus } from '@nestjs/common';
import { Model } from 'ogm-neo4j/models';

import { OGMService } from 'core/database/ogm-neo4j/ogm.service';
import {
  AllResponse,
  CreateResponse,
  DeleteResponse,
  GetResponse,
  IBaseModelService,
} from './Ibase.service';
import { JsonData } from './base.controller';

export interface ServiceException {
  code: HttpStatus;
  cause: JsonData;
}

export class BaseModelService<T extends Model<any, any>>
  implements IBaseModelService<T>
{
  readonly name: string;
  readonly #entityRepository: T;

  constructor(service: OGMService, name: string) {
    this.name = name;
    this.#entityRepository = service.app.retrieveModel<T>(this.name);
  }

  create(entity: Parameters<T['create']>['0']) {
    try {
      return this.#entityRepository.create(entity) as CreateResponse<T>;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  getAll(
    properties?: Parameters<T['all']>['0'],
    options?: Parameters<T['all']>['1'],
  ) {
    try {
      return this.#entityRepository.all(properties, options) as AllResponse<T>;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  get(id: Parameters<T['find']>['0']) {
    try {
      return this.#entityRepository.find(id) as GetResponse<T>;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  delete(id: Parameters<T['delete']>['0']) {
    try {
      return this.#entityRepository.delete(id) as DeleteResponse<T>;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}

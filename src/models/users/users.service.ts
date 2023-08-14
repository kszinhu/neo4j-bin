import { Injectable } from '@nestjs/common';
import { OGMService } from 'config/database/ogm-neo4j/ogm.service';

import type {
  UserModel,
  UserModelProperties,
  UserPropertiesKeys as UserProperties,
} from './user.interface';

@Injectable()
export class UsersService {
  #userDAO: UserModel;

  constructor(private readonly ogmService: OGMService) {
    this.#userDAO = ogmService.ogm.retrieveModel<UserModel>('User');
  }

  async all(
    properties?: UserProperties[],
    options?: Parameters<UserModel['all']>['1'],
  ) {
    return await this.#userDAO.all<UserModel>(properties, options);
  }

  async create(userData: UserModelProperties) {
    return await this.#userDAO.create(userData);
  }

  async first(
    key: keyof UserModelProperties,
    value: UserModelProperties[keyof UserModelProperties],
  ) {
    return await this.#userDAO.first<UserModel>(key, value);
  }

  async findByID(id: string) {
    return await this.#userDAO.findByID<UserModel>(id);
  }
}

import { Model } from 'ogm-neo4j/models';
import type { ProvidedPropertiesFactory } from 'ogm-neo4j/types/models';

export interface User {
  id: string;
}

export type UserModelProperties = ProvidedPropertiesFactory<
  keyof User & string,
  'id'
>;

export type UserModel = Model<User, UserModelProperties>;

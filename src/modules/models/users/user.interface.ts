import { Model } from 'ogm-neo4j/models';
import type { ProvidedPropertiesFactory } from 'ogm-neo4j/types/models';

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  sex: 'M' | 'F' | 'X';
  birth_at: Date;
}

export type UserPropertiesKeys = keyof User & string;

export type UserModelProperties = ProvidedPropertiesFactory<UserPropertiesKeys>;

export type UserModel = Model<UserPropertiesKeys & string, UserModelProperties>;

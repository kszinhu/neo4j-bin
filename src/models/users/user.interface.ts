import { Model } from 'ogm-neo4j/models';
import type { ProvidedPropertiesFactory } from 'ogm-neo4j/types/models';

export interface User {
  id: string;
  cpf: string;
  email: string;
  username: string;
  password: string;
  name: string;
  rg?: string;
  sex: 'M' | 'F' | 'X';
  birth_at: Date;
  address: string;
  tickets: any[];
  created_at: Date;
  updated_at?: Date;
}

export type UserPropertiesKeys = keyof User & string;

export type UserModelProperties = ProvidedPropertiesFactory<UserPropertiesKeys>;

export type UserModel = Model<UserPropertiesKeys & string, UserModelProperties>;

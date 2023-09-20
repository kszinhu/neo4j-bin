import { Model } from 'ogm-neo4j/models';
import type { ProvidedPropertiesFactory } from 'ogm-neo4j/types/models';

export interface Category {
  id: number;
  code?: string;
}

export type CategoryModelProperties = ProvidedPropertiesFactory<
  keyof Category & string,
  'id'
>;

export type CategoryModel = Model<Category, CategoryModelProperties>;

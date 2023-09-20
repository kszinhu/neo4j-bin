import { Model } from 'ogm-neo4j/models';
import type { ProvidedPropertiesFactory } from 'ogm-neo4j/types/models';

export interface Product {
  id: number;
  brand?: string;
  price: number;
}

export type ProductModelProperties = ProvidedPropertiesFactory<
  keyof Product & string,
  'id'
>;

export type ProductModel = Model<Product, ProductModelProperties>;

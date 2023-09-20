import { Model } from 'ogm-neo4j/models';
import type { ProvidedPropertiesFactory } from 'ogm-neo4j/types/models';
import type { User } from '../user/user.interface';
import type { Product } from '../product/product.interface';

export interface Event {
  time: Date;
  type: 'view' | 'cart' | 'remove_from_cart' | 'purchase';
  user_session: string;
  user: User;
  product: Product;
}

export type EventModelProperties = ProvidedPropertiesFactory<
  keyof Event & string,
  'time'
>;

export type EventModel = Model<Event, EventModelProperties>;

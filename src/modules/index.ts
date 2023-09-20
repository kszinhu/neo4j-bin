import { CategoryModule } from './models/category/category.module';
import { EventsModule } from './models/event/event.module';
import { ProductsModule } from './models/product/product.module';
import { UsersModule } from './models/user/user.module';

export const Modules = [
  UsersModule,
  ProductsModule,
  EventsModule,
  CategoryModule,
];

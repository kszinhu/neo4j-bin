import { Injectable } from '@nestjs/common';
import { BaseModelService } from '@core/concerns/model';
import { Product, productSchema } from './product.dto';
import { DatabaseService } from '@core/database/database.service';

@Injectable()
export class ProductsService extends BaseModelService<
  'product',
  Product,
  'id'
> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'product', productSchema as any);
  }
}

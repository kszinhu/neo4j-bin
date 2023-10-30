import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseModelController } from 'core/concerns/model/base.controller';

import { Product } from './product.interface';
import { ProductsService } from './product.service';
import { ProductSerializer } from './product.serializer';

@Controller('products')
export class ProductsController extends BaseModelController<Product, 'id'> {
  constructor(
    private readonly productService: ProductsService,
    private readonly configService: ConfigService,
  ) {
    super(productService, new ProductSerializer(configService));
  }
}

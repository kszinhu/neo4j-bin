import { Controller } from '@nestjs/common';
import { Product } from './product.interface';
import { BaseController } from 'core/concerns/base.controller';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController extends BaseController<Product, 'id'> {
  constructor(private readonly productService: ProductsService) {
    super(productService);
  }
}

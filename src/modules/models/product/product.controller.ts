import { Controller } from '@nestjs/common';
import { Product } from './product.dto';
import { BaseModelController } from 'core/concerns/model/baseModel.controller';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController extends BaseModelController<Product, 'id'> {
  constructor(private readonly productService: ProductsService) {
    super(productService);
  }
}

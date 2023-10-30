import { BaseSerializer } from 'core/concerns/model';

import { Product } from './product.interface';
import { ConfigService } from '@nestjs/config';

export class ProductSerializer extends BaseSerializer<Product> {
  constructor(private readonly configService: ConfigService) {
    super('products', configService);
  }
}

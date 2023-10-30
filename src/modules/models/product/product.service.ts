import { Injectable } from '@nestjs/common';

import { BaseModelService } from 'core/concerns/model';

import { OGMService } from 'core/database/ogm-neo4j/ogm.service';
import type { ProductModel } from './product.interface';

@Injectable()
export class ProductsService extends BaseModelService<ProductModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Product');
  }
}

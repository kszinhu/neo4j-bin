import { Injectable } from '@nestjs/common';
import { BaseService } from 'core/concerns/base.service';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';
import { ProductModel } from './product.interface';

@Injectable()
export class ProductsService extends BaseService<ProductModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Product');
  }
}

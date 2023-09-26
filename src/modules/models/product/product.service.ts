import { Injectable } from '@nestjs/common';
import { BaseModelService } from 'core/concerns/model/baseModel.service';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';
import { ProductModel } from './product.interface';

@Injectable()
export class ProductsService extends BaseModelService<ProductModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Product');
  }
}

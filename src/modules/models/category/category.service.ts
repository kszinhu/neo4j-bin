import { Injectable } from '@nestjs/common';
import { BaseService } from 'core/concerns/base.service';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';
import { CategoryModel } from './category.interface';

@Injectable()
export class CategoriesService extends BaseService<CategoryModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Category');
  }
}

import { Injectable } from '@nestjs/common';

import { BaseModelService } from 'core/concerns/model';
import { OGMService } from 'core/database/ogm-neo4j/ogm.service';

import type { CategoryModel } from './category.interface';

@Injectable()
export class CategoriesService extends BaseModelService<CategoryModel> {
  constructor(private readonly ogmService: OGMService) {
    super(ogmService, 'Category');
  }
}

import { Controller } from '@nestjs/common';

import { BaseModelController } from 'core/concerns/model/baseModel.controller';
import { CategoriesService } from './category.service';
import { Category } from './category.dto';

@Controller('categories')
export class CategoriesController extends BaseModelController<Category, 'id'> {
  constructor(private readonly categoryService: CategoriesService) {
    super(categoryService);
  }
}

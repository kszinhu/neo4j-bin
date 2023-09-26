import { Controller } from '@nestjs/common';
import { Category } from './category.interface';
import { BaseModelController } from 'core/concerns/model/baseModel.controller';
import { CategoriesService } from './category.service';

@Controller('categories')
export class CategoriesController extends BaseModelController<Category, 'id'> {
  constructor(private readonly categoryService: CategoriesService) {
    super(categoryService);
  }
}

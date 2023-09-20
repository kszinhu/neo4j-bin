import { Controller } from '@nestjs/common';
import { Category } from './category.interface';
import { BaseController } from 'core/concerns/base.controller';
import { CategoriesService } from './category.service';

@Controller('categories')
export class CategoriesController extends BaseController<Category, 'id'> {
  constructor(private readonly categoryService: CategoriesService) {
    super(categoryService);
  }
}

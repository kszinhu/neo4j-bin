import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BaseModelController } from 'core/concerns/model/base.controller';

import { Category } from './category.interface';
import { CategoriesService } from './category.service';
import { CategorySerializer } from './category.serializer';

@Controller('categories')
export class CategoriesController extends BaseModelController<Category, 'id'> {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly configService: ConfigService,
  ) {
    super(categoryService, new CategorySerializer(configService));
  }
}

import { Injectable } from '@nestjs/common';
import { BaseModelService } from '@core/concerns/model';
import { DatabaseService } from '@core/database/database.service';
import { Category, categorySchema } from './category.dto';

@Injectable()
export class CategoriesService extends BaseModelService<
  'category',
  Category,
  'id'
> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'category', categorySchema);
  }
}

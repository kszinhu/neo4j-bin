import { BaseSerializer } from 'core/concerns/model';

import { Category } from './category.interface';
import { ConfigService } from '@nestjs/config';

export class CategorySerializer extends BaseSerializer<Category> {
  constructor(private readonly configService: ConfigService) {
    super('categories', configService);
  }
}

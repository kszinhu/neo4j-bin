import { Category } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity implements Category {
  @ApiProperty({
    description: 'The id of the category',
    type: 'number',
    readOnly: true,
    example: '1',
  })
  // @ts-expect-error - Object is assign in the constructor
  id: number;

  @ApiProperty({
    description: 'The code of the category',
    type: 'string',
    example: 'SHOES',
  })
  // @ts-expect-error - Object is assign in the constructor
  code: string | null;

  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}

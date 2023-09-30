import { Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty({
    description: 'The id of the user',
    type: 'number',
    example: '1',
  })
  // @ts-expect-error - Object is assign in the constructor
  id: number;

  @ApiProperty({
    description: 'The name of brand of the product',
    type: 'string | null',
    example: 'Nike',
  })
  // @ts-expect-error - Object is assign in the constructor
  brand: string;

  @ApiProperty({
    description: 'Price of the product',
    type: 'number',
    example: '24.90',
  })
  // @ts-expect-error - Object is assign in the constructor
  price: number;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}

import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty({
    description: 'The id of the user',
    type: 'number',
    example: '1',
  })
  // @ts-expect-error - Object is assign in the constructor
  id: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

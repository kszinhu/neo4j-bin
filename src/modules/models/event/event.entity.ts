import { EventKind, Event } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EventEntity implements Event {
  @ApiProperty({
    description: 'The id of the user',
    type: 'number',
    readOnly: true,
    example: '1',
  })
  // @ts-expect-error - Object is assign in the constructor
  id: number;

  @ApiProperty({
    description: 'The time of the event',
    type: 'string',
    example: '2021-03-16T15:00:00.000Z',
  })
  // @ts-expect-error - Object is assign in the constructor
  time: Date;

  @ApiProperty({
    description: 'The kind of the event',
    example: 'view',
    enum: ['CAR', 'VIEW', 'PURCHASE', 'REMOVE_FROM_CART'],
  })
  // @ts-expect-error - Object is assign in the constructor
  kind: EventKind;

  @ApiProperty({
    description: 'The id of the product',
    type: 'number',
    readOnly: true,
    example: '1',
  })
  // @ts-expect-error - Object is assign in the constructor
  product_id: number;

  @ApiProperty({
    description: 'The id of the user',
    type: 'number',
    readOnly: true,
    example: '1',
  })
  // @ts-expect-error - Object is assign in the constructor
  user_id: number;

  @ApiProperty({
    description: 'The session of the user',
    type: 'string',
    readOnly: true,
    example: '1',
  })
  // @ts-expect-error - Object is assign in the constructor
  user_session: string;

  constructor(partial: Partial<EventEntity>) {
    Object.assign(this, partial);
  }
}

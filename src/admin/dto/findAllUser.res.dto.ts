import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class findAlluserResDto {
  @ApiProperty({
    description: '전체 사용자 목록',
    type: Object,
    example: [
      {
        id: 1,
        username: 'user1',
        bankbook: 5000,
        type: 'seller',
      },
      {
        id: 2,
        username: 'user2',
        bankbook: 10000,
        type: 'buyer',
      },
    ],
  })
  @IsNotEmpty()
  user: {
    id: number;
    username: string;
    bankbook: number;
    type: string;
  };
}

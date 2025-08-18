import { ApiProperty } from '@nestjs/swagger';

export class chargeResDto {
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  username: string;
  @ApiProperty({
    description: '충전 후 계좌 잔액',
    example: 10000,
  })
  bankbook: number;
}

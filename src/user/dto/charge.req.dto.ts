import { ApiProperty } from '@nestjs/swagger';

export class chargeReqDto {
  @ApiProperty({
    description: '충전할 금액',
    example: 10000,
  })
  amount: number;
}

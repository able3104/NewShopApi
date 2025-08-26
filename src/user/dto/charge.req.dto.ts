import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class chargeReqDto {
  @ApiProperty({
    description: '충전할 금액',
    example: 10000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class chargeResDto {
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '충전 후 계좌 잔액',
    example: 10000,
  })
  @IsNotEmpty()
  @IsNumber()
  bankbook: number;
}

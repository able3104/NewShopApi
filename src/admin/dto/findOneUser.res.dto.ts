import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class findOneuserResDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '사용자 계좌 잔액',
    example: 10000,
  })
  @IsNotEmpty()
  @IsNumber()
  bankbook: number;

  @ApiProperty({
    description: '사용자 유형',
    example: 'buyer',
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}

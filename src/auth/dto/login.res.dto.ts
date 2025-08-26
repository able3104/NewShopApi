import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class loginResDto {
  @ApiProperty({
    description: '토큰',
    example: ' ',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: '토큰 만료 시간',
    example: '300s',
  })
  @IsNotEmpty()
  @IsNumber()
  expiresIn: number;
}

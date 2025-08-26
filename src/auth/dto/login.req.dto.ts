import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class loginReqDto {
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'examplePassword',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

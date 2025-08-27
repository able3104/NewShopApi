import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createAdminReqDto {
  @ApiProperty({
    description: '관리자 이름',
    example: 'adminUser',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '관리자 비밀번호',
    example: 'adminPassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

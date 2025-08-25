import { ApiProperty } from '@nestjs/swagger';

export class loginReqDto {
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  username: string;

  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'examplePassword',
  })
  password: string;
}

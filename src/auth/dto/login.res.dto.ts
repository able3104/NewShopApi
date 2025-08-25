import { ApiProperty } from '@nestjs/swagger';

export class loginResDto {
  @ApiProperty({
    description: '토큰',
    example: ' ',
  })
  accessToken: string;

  @ApiProperty({
    description: '토큰 만료 시간',
    example: '300s',
  })
  expiresIn?: number;
}

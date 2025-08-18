import { ApiProperty } from '@nestjs/swagger';

export class findOneResDtoUser {
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  username: string;

  @ApiProperty({
    description: '사용자 유형',
    example: 'SELLER',
  })
  type: string;
}

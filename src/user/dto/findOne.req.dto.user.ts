import { ApiProperty } from '@nestjs/swagger';

export class findOneReqDtoUser {
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  username: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class findOneResDtoUser {
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '사용자 유형',
    example: 'SELLER',
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}

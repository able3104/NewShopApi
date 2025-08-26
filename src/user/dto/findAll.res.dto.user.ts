import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class findAllResDtoUser {
  @ApiProperty({
    description: '사용자 목록',
    type: [String],
    example: ['user1', 'user2', 'user3'],
  })
  @IsNotEmpty()
  @IsString()
  users: string[];
}

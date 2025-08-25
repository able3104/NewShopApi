import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/user/entity/user.entity';

export class UserInfoDto {
  @ApiProperty({
    description: '사용자 ID (PK)',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  username: string;

  @ApiProperty({
    description: '사용자 유형',
    default: UserType.SELLER,
  })
  type: UserType;
}

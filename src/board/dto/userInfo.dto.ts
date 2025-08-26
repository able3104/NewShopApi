import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserType } from 'src/user/entity/user.entity';

export class UserInfoDto {
  @ApiProperty({
    description: '사용자 ID (PK)',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '사용자 유형',
    default: UserType.SELLER,
  })
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}

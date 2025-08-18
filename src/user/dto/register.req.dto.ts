import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class registerReqDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '사용자 이름',
    default: 'exampleUser',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '사용자 비밀번호',
    default: 'examplePassword',
  })
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 유형',
    enum: UserType,
    default: UserType.SELLER,
  })
  type: UserType;
}

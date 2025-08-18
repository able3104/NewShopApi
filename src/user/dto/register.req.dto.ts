import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { UserType } from '../entity/user.entity';

export class registerReqDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(UserType)
  type: UserType;
}

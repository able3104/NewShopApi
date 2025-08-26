import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { UserInfoDto } from './userInfo.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class createResDtoBoard {
  @ApiProperty({
    description: '상품 이름',
    example: 'exampleProduct',
  })
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @ApiProperty({
    description: '상품 설명',
    example: 'Example product description.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: '상품 가격',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: '상품 재고',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserInfoDto)
  @ApiProperty({
    description: '유저 정보',
    type: UserInfoDto,
  })
  userInfo: UserInfoDto;
}

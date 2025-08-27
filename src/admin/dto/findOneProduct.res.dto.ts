import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

export class findOneProductResDto {
  @ApiProperty({
    description: '상품 ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: '상품 이름',
    example: 'Sample Product',
  })
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @ApiProperty({
    description: '상품 설명',
    example: 'This is a sample product description.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: '상품 가격',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: '상품 재고',
    example: 50,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: '판매자 정보',
    type: Object,
    example: {
      id: 1,
      username: 'user1',
      bankbook: 5000,
      type: 'seller',
    },
  })
  @IsNotEmpty()
  user: User;
}

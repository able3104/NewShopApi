import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class findOneResDtoBoard {
  @ApiProperty({
    description: '판매자 이름',
    example: 'exampleSeller',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: '상품 이름',
    example: 'Example Product',
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
}

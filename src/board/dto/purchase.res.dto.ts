import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class purchaseResDto {
  @ApiProperty({
    description: '구매자 이름',
    example: 'exampleUser',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

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
    description: '상품 수량',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}

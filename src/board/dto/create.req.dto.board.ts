import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class createReqDtoBoard {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '상품 이름',
    default: 'exampleProduct',
  })
  product_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '상품 설명',
    default: 'Example product description.',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '상품 가격',
    example: 10,
  })
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '상품 재고',
    example: 100,
  })
  @Min(1)
  stock: number;
}

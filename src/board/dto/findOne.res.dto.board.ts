import { ApiProperty } from '@nestjs/swagger';

export class findOneResDtoBoard {
  @ApiProperty({
    description: '판매자 이름',
    example: 'exampleSeller',
  })
  username: string;

  @ApiProperty({
    description: '상품 이름',
    example: 'Example Product',
  })
  product_name: string;

  @ApiProperty({
    description: '상품 설명',
    example: 'Example product description.',
  })
  description: string;

  @ApiProperty({
    description: '상품 가격',
    example: 10,
  })
  price: number;

  @ApiProperty({
    description: '상품 재고',
    example: 100,
  })
  stock: number;
}

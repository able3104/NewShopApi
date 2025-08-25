import { ApiProperty } from '@nestjs/swagger';

export class purchaseResDto {
  @ApiProperty({
    description: '구매자 이름',
    example: 'exampleUser',
  })
  username: string;

  @ApiProperty({
    description: '상품 이름',
    example: 'exampleProduct',
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
    description: '상품 수량',
    example: 100,
  })
  stock: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class findAllResDtoBoard {
  @ApiProperty({
    description: '상품 목록',
    type: [Object],
    example: [
      {
        product_name: 'Example Product',
        description: 'Example product description.',
        price: 10,
        stock: 100,
      },
      {
        product_name: 'Another Product',
        description: 'Another product description.',
        price: 20,
        stock: 50,
      },
    ],
  })
  boards: {
    // @ApiProperty({
    //   description: '상품 이름',
    //   example: 'Example Product',
    // })
    product_name: string;

    // @ApiProperty({
    //   description: '상품 설명',
    //   example: 'Example product description.',
    // })
    description: string;

    // @ApiProperty({
    //   description: '상품 가격',
    //   example: 10,
    // })
    price: number;

    // @ApiProperty({
    //   description: '상품 재고',
    //   example: 100,
    // })
    stock: number;
  }[];
}

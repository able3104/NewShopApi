import { ApiProperty } from '@nestjs/swagger';

export class purchaseReqDto {
  @ApiProperty({
    description: '상품 이름',
    example: 'exampleProduct',
  })
  product_name: string;

  @ApiProperty({
    description: '구매 상품 수량',
    example: 2,
  })
  quantity: number;
}

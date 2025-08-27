import { ApiProperty } from '@nestjs/swagger';

export class findOneProductReqDto {
  @ApiProperty({
    description: '상품 ID',
    example: 1,
  })
  product_id: number;
}

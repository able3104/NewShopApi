import { ApiProperty } from '@nestjs/swagger';

export class removeReqDtoBoard {
  @ApiProperty({
    description: '상품 이름',
    example: 'exampleProduct',
  })
  product_name: string;
}

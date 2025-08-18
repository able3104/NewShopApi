import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';

export class createResDtoBoard {
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
    description: '상품 재고',
    example: 100,
  })
  stock: number;

  @ApiProperty({
    description: '유저 정보',
    type: User,
  })
  user: User;
}

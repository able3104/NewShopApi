import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entity/user.entity';

export class findAllProductResDto {
  @ApiProperty({
    description: '모든 상품 목록',
    type: Object,
    example: [
      {
        id: 1,
        product_name: 'Example Product',
        description: 'Example product description.',
        price: 10,
        stock: 100,
        user: {
          id: 1,
          username: 'user1',
          bankbook: 5000,
          type: 'seller',
        },
      },
      {
        id: 2,
        product_name: 'Another Product',
        description: 'Another product description.',
        price: 20,
        stock: 50,
        user: {
          id: 3,
          username: 'exampleUser',
          bankbook: 10000,
          type: 'seller',
        },
      },
    ],
  })
  @IsNotEmpty()
  board: {
    id: number;
    product_name: string;
    description: string;
    price: number;
    stock: number;
    user: User;
  }[];
}

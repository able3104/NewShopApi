import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class removeReqDtoBoard {
  @ApiProperty({
    description: '상품 이름',
    example: 'exampleProduct',
  })
  @IsNotEmpty()
  @IsString()
  product_name: string;
}

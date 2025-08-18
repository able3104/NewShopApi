import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class createReqDtoBoard {
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
  created: Date;
}

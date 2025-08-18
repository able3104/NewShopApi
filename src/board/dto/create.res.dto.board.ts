import { User } from 'src/user/entity/user.entity';

export class createResDtoBoard {
  product_name: string;
  description: string;
  price: number;
  stock: number;
  user: User;
}

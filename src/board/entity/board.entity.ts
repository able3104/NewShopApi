import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @ApiProperty({
    description: '사용자 ID (PK)',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '상품 이름',
    example: 'exampleProduct',
  })
  @Column()
  product_name: string;

  @ApiProperty({
    description: '상품 설명',
    example: 'Example product description.',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    description: '상품 가격',
    example: 10,
  })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: '상품 재고',
    example: 100,
  })
  @Column()
  stock: number;

  @ManyToOne(() => User, (user) => user.boards, {
    onDelete: 'CASCADE',
  })
  user: User;
}

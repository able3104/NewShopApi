import { Board } from 'src/board/entity/board.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.BUYER,
  })
  type: UserType;

  @Column({ default: 0 })
  bankbook: number;

  @OneToMany(() => Board, (board) => board.user, {
    onDelete: 'CASCADE',
  })
  boards: Board[];
}

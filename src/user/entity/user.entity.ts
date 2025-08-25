import { ApiProperty } from '@nestjs/swagger';
import { Board } from 'src/board/entity/board.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserType {
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '사용자 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '사용자 이름',
    example: 'exampleUser',
  })
  username: string;

  @Column()
  @ApiProperty({
    description: '사용자 비밀번호',
    example: 'examplePassword',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.BUYER,
  })
  @ApiProperty({
    description: '사용자 유형',
    enum: UserType,
    default: UserType.SELLER,
  })
  type: UserType;

  @Column({ default: 0 })
  @ApiProperty({
    description: '사용자 계좌 잔액',
    example: 10000,
  })
  bankbook: number;

  @OneToMany(() => Board, (board) => board.user, {
    onDelete: 'CASCADE',
  })
  boards: Board[];
}

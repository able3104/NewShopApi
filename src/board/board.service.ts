import {
  Body,
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entity/board.entity';
import { createBoardDto } from './dto/createBoard.res.dto';
import { UserService } from 'src/user/user.service';
import { User, UserType } from 'src/user/entity/user.entity';
import { purchaseReqDto } from './dto/purchase.req.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private readonly userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(@Body() dto: createBoardDto, user: User): Promise<Board> {
    const seller: User = await this.userService.findOne(user.id);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    if (seller.type !== UserType.SELLER) {
      throw new ForbiddenException('Only sellers can create boards');
    }
    const newBoard: Board = this.boardRepository.create({
      ...dto,
      user: seller,
    });
    return this.boardRepository.save(newBoard);
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  async remove(id: number, user: User): Promise<void> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!board) {
      throw new NotFoundException('Board not found.');
    }

    if (board.user.id !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to delete this board.',
      );
    }

    await this.boardRepository.remove(board);
  }

  async purchase(dto: purchaseReqDto, user: User): Promise<Board> {
    const { productId, quantity } = dto;
    const buyer = await this.userService.findOne(user.id);

    if (buyer.type !== UserType.BUYER) {
      throw new BadRequestException('Only buyers can purchase products.');
    }

    const product = await this.boardRepository.findOne({
      where: { id: productId },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (quantity <= 0) {
      throw new BadRequestException(
        'Purchase quantity must be a positive number.',
      );
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Not enough stock available.');
    }

    const totalPrice = product.price * quantity;
    if (buyer.bankbook < totalPrice) {
      throw new BadRequestException('Not enough balance in bankbook.');
    }

    const seller = product.user;
    buyer.bankbook -= totalPrice;
    seller.bankbook += totalPrice;
    product.stock -= quantity;

    await this.userRepository.save(buyer);
    await this.userRepository.save(seller);
    return this.boardRepository.save(product);
  }
}

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
import { UserService } from 'src/user/user.service';
import { User, UserType } from 'src/user/entity/user.entity';
import { purchaseReqDto } from './dto/purchase.req.dto';
import { createReqDtoBoard } from './dto/create.req.dto.board';
import { createResDtoBoard } from './dto/create.res.dto.board';
import { findAllReqDtoBoard } from './dto/findAll.req.dto.board';
import { findAllResDtoBoard } from './dto/findAll.res.dto.board';
import { findOneReqDtoBoard } from './dto/findOne.req.dto.board';
import { findOneResDtoBoard } from './dto/findOne.res.dto.board';
import { removeReqDtoBoard } from './dto/remove.req.dto.board';
import { removeResDtoBoard } from './dto/remove.res.dto.board';
import { purchaseResDto } from './dto/purchase.res.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private readonly userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    @Body() dto: createReqDtoBoard,
    user: User,
  ): Promise<createResDtoBoard> {
    const seller = await this.userRepository.findOne({
      where: { id: user.id, type: UserType.SELLER },
    });
    const response = new createResDtoBoard();
    if (!seller) {
      throw new NotFoundException();
    }
    response.product_name = dto.product_name;
    response.description = dto.description;
    response.price = dto.price;
    response.stock = dto.stock;
    response.user = seller;
    const newBoard: Board = this.boardRepository.create(response);
    await this.boardRepository.save(newBoard);
    return response;
  }

  async findAll(dto: findAllReqDtoBoard): Promise<findAllResDtoBoard> {
    const boards = await this.boardRepository.find();
    const response = new findAllResDtoBoard();
    response.boards = boards.map((board) => ({
      product_name: board.product_name,
      description: board.description,
      price: board.price,
      stock: board.stock,
    }));
    return response;
  }

  async findOne(dto: findOneReqDtoBoard): Promise<findOneResDtoBoard> {
    const board = await this.boardRepository.findOne({
      where: { product_name: dto.product_name },
      relations: ['user'],
    });
    const response = new findOneResDtoBoard();
    if (!board) {
      throw new NotFoundException();
    }
    response.product_name = board.product_name;
    response.description = board.description;
    response.price = board.price;
    response.stock = board.stock;
    response.username = board.user.username;
    return response;
  }

  async remove(dto: removeReqDtoBoard, user: User): Promise<removeResDtoBoard> {
    const board = await this.boardRepository.findOne({
      where: {
        product_name: dto.product_name,
      },
      relations: ['user'],
    });
    const response = new removeResDtoBoard();

    if (!board) {
      throw new NotFoundException('');
    }

    await this.boardRepository.remove(board);
    return response;
  }

  async purchase(dto: purchaseReqDto, user: User): Promise<purchaseResDto> {
    const { product_name, quantity } = dto;
    const buyer = await this.userRepository.findOne({
      where: { id: user.id, type: UserType.BUYER },
    });
    if (!buyer) {
      throw new NotFoundException();
    }
    if (buyer.type !== UserType.BUYER || quantity <= 0) {
      throw new BadRequestException();
    }

    const product = await this.boardRepository.findOne({
      where: { product_name: product_name },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException();
    }

    const totalPrice = product.price * quantity;

    if (product.stock < quantity || buyer.bankbook < totalPrice) {
      throw new BadRequestException();
    }

    const seller = product.user;
    buyer.bankbook -= totalPrice;
    seller.bankbook += totalPrice;
    product.stock -= quantity;

    const response = new purchaseResDto();
    response.product_name = product.product_name;
    response.description = product.description;
    response.price = product.price;
    response.stock = product.stock;
    response.username = buyer.username;

    await this.userRepository.save(buyer);
    await this.userRepository.save(seller);
    await this.boardRepository.save(product);
    return response;
  }
}

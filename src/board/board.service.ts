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
import { UserInfoDto } from './dto/userInfo.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private readonly userService: UserService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(dto: createReqDtoBoard, user: User): Promise<createResDtoBoard> {
    //셀러 여부를 체크한다
    const seller = await this.userRepository.findOne({
      where: { id: user.id, type: UserType.SELLER },
    }); //User
    if (!seller) {
      throw new NotFoundException();
    }

    //게시물을 저장한다
    const boardEntity = new Board();
    boardEntity.product_name = dto.product_name;
    boardEntity.description = dto.description;
    boardEntity.price = dto.price;
    boardEntity.stock = dto.stock;
    boardEntity.user = seller;
    await this.boardRepository.save(boardEntity);

    //response 한다
    const response = new createResDtoBoard();
    const userinfo = new UserInfoDto();

    userinfo.id = seller.id;
    userinfo.username = seller.username;
    userinfo.type = seller.type;

    response.product_name = dto.product_name;
    response.description = dto.description;
    response.price = dto.price;
    response.stock = dto.stock;
    response.userInfo = userinfo;

    return response;
  }

  async findAll(dto: findAllReqDtoBoard): Promise<findAllResDtoBoard> {
    //상품 전체 조회 & 존재 확인한다
    const boards = await this.boardRepository.find();
    if (!boards) throw new NotFoundException();
    //User

    //response 에 상품 이름, 정보, 가격, 수량 을 담는다
    const response = new findAllResDtoBoard();
    response.boards = boards.map((board) => ({
      product_name: board.product_name,
      description: board.description,
      price: board.price,
      stock: board.stock,
    }));
    //response 한다
    return response;
  }

  async findOne(dto: findOneReqDtoBoard): Promise<findOneResDtoBoard> {
    //user 정보, 상품 이름 일치하는 board 체크한다
    const board = await this.boardRepository.findOne({
      where: { product_name: dto.product_name },
      relations: ['user'],
    }); //Board563
    if (!board) {
      throw new NotFoundException();
    }

    //response 에 상품 이름, 정보, 가격, 수량, 판매자 이름을 담는다
    const response = new findOneResDtoBoard();
    response.product_name = board.product_name;
    response.description = board.description;
    response.price = board.price;
    response.stock = board.stock;
    response.username = board.user.username;
    //response 한다
    return response;
  }

  async remove(dto: removeReqDtoBoard, user: User): Promise<removeResDtoBoard> {
    //board 체크한다
    const board = await this.boardRepository.findOne({
      where: {
        product_name: dto.product_name,
      },
      relations: ['user'],
    }); //Board
    if (!board) {
      throw new NotFoundException('');
    }

    //board 제거한다
    await this.boardRepository.remove(board);

    //response 한다
    const response = new removeResDtoBoard();
    return response;
  }

  async purchase(dto: purchaseReqDto, user: User): Promise<purchaseResDto> {
    //buyer 존재 여부 체크
    const { product_name, quantity } = dto;
    const buyer = await this.userRepository.findOne({
      where: { id: user.id, type: UserType.BUYER },
    }); //User
    if (!buyer) {
      throw new NotFoundException();
    }

    //buyer 타입 체크, quantity 양수 체크
    if (buyer.type !== UserType.BUYER || quantity <= 0) {
      throw new BadRequestException();
    }

    //product 체크
    const product = await this.boardRepository.findOne({
      where: { product_name: product_name },
      relations: ['user'],
    }); //Board
    if (!product) {
      throw new NotFoundException();
    }

    //product 가격, 통장 잔액, 수량 비교 체크
    const totalPrice = product.price * quantity;
    if (product.stock < quantity || buyer.bankbook < totalPrice) {
      throw new BadRequestException();
    }
    //product 저장
    await this.boardRepository.save(product);

    // const seller = new User();
    const seller = product.user;
    buyer.bankbook -= totalPrice;
    seller.bankbook += totalPrice;
    product.stock -= quantity;
    //product 의 user 정보(seller), buyer 정보 업데이트
    await this.userRepository.save(buyer);
    await this.userRepository.save(seller);

    //response 한다
    const response = new purchaseResDto();
    response.product_name = product.product_name;
    response.description = product.description;
    response.price = product.price;
    response.stock = product.stock;
    response.username = buyer.username;

    return response;
  }
}

// src/user/user.service.ts
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
import { User, UserType } from './entity/user.entity';
import { chargeReqDto } from './dto/charge.req.dto';
import { registerReqDto } from './dto/register.req.dto';
import { registerResDto } from './dto/register.res.dto';
import { findAllReqDtoUser } from './dto/findAll.req.dto.user';
import { findAllResDtoUser } from './dto/findAll.res.dto.user';
import { findOneReqDtoUser } from './dto/findOne.req.dto.user';
import { findOneResDtoUser } from './dto/findOne.res.dto';
import { removeReqDtoUser } from './dto/remove.req.dto.user';
import { removeResDtoUser } from './dto/remove.res.dto.user';
import { chargeResDto } from './dto/charge.res.dto';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: registerReqDto): Promise<registerResDto> {
    //user 체크
    const existingUser = await this.userRepository.findOne({
      where: { username: dto.username },
    }); //User
    if (existingUser) {
      throw new BadRequestException();
    }

    //user 저장
    const userEntity = new User();
    userEntity.username = dto.username;
    userEntity.password = dto.password;
    userEntity.type = dto.type;
    // await this.userRepository.create(userEntity);
    await this.userRepository.save(userEntity);

    // const newUser: User = this.userRepository.create(dto);
    // await this.userRepository.save(newUser);

    //response 한다
    const response = new registerResDto();
    return response;
  }

  // async findAll(dto: findAllReqDtoUser): Promise<findAllResDtoUser> {
  //   //유저 정보 전체 조회
  //   const users = await this.userRepository.find();
  //   //User

  //   //response 에 유저 이름만 담는다
  //   const response = new findAllResDtoUser();
  //   response.users = users.map((user) => user.username);
  //   //response 한다
  //   return response;
  // }

  async findOne(user: User): Promise<findOneResDtoUser> {
    const { id } = user;
    //user 체크
    const existingUser = await this.userRepository.findOne({
      where: { id: id },
    }); //User
    // 나를 조회
    if (!user) {
      throw new NotFoundException();
    }

    //response 에 사용자 이름, 유형 을 담는다
    const response = new findOneResDtoUser();
    response.username = user.username;
    response.type = user.type;
    //response 한다
    return response;
  }

  async remove(dto: removeReqDtoUser, user: User): Promise<removeResDtoUser> {
    const { id } = user;
    //사용자 존재 여부 체크
    const existingUser = await this.userRepository.findOne({
      where: { id: id },
    }); //User
    if (!existingUser) {
      throw new NotFoundException();
    }

    //사용자 정보 삭제
    await this.userRepository.remove(existingUser);

    //response 한다
    const response = new removeResDtoUser();
    return response;
  }

  async charge(dto: chargeReqDto, user: User): Promise<chargeResDto> {
    const { amount } = dto;
    //사용자 정보 체크
    const userToCharge = await this.userRepository.findOne({
      where: { id: user.id },
    }); //User
    if (!userToCharge) {
      throw new NotFoundException();
    }

    //충전
    userToCharge.bankbook += amount;
    //사용자 정보 업데이트
    await this.userRepository.save(userToCharge);

    //response 한다
    const response = new chargeResDto();
    response.bankbook = userToCharge.bankbook;
    response.username = userToCharge.username;
    return response;
  }
}

//개발하기싫어요.... - 김도현 왈 -

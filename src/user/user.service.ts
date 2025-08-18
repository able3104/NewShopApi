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
    const existingUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (existingUser) {
      throw new BadRequestException();
    }

    const newUser: User = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    const response = new registerResDto();
    return response;
  }

  async findAll(dto: findAllReqDtoUser): Promise<findAllResDtoUser> {
    const users = await this.userRepository.find();
    const response = new findAllResDtoUser();
    response.users = users.map((user) => user.username);
    return response;
  }

  async findOne(dto: findOneReqDtoUser): Promise<findOneResDtoUser> {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    const response = new findOneResDtoUser();
    if (!user) {
      throw new NotFoundException();
    }
    response.username = user.username;
    response.type = user.type;
    return response;
  }

  async remove(dto: removeReqDtoUser, user: User): Promise<removeResDtoUser> {
    const { id } = user;
    const existingUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!existingUser) {
      throw new NotFoundException();
    }
    const response = new removeResDtoUser();

    await this.userRepository.remove(existingUser);
    return response;
  }

  async charge(dto: chargeReqDto, user: User): Promise<chargeResDto> {
    const { amount } = dto;
    const userToCharge = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userToCharge) {
      throw new NotFoundException();
    }
    userToCharge.bankbook += amount;
    await this.userRepository.save(userToCharge);
    const response = new chargeResDto();
    response.bankbook = userToCharge.bankbook;
    response.username = userToCharge.username;
    return response;
  }
}

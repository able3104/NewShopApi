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
import { createUserDto } from './dto/create.res.dto';
import { ChargeReqDto } from './dto/charge.req.dto';
import e, { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: createUserDto): Promise<User> {
    const newUser: User = this.userRepository.create({ ...dto });
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(user: User): Promise<void> {
    const { id } = user;
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // const userToRemove = await this.findOne(id);

    await this.userRepository.remove(existingUser);
  }

  async charge(dto: ChargeReqDto, user: User): Promise<User> {
    const { amount } = dto;
    const userToCharge = await this.findOne(user.id);

    userToCharge.bankbook += amount;
    return this.userRepository.save(userToCharge);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindOneOptions, Not, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from './payload';
import { payloadClass } from './payload.class';
import { loginReqDto } from './dto/login.req.dto';
import { loginResDto } from './dto/login.res.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(dto: loginReqDto): Promise<loginResDto> {
    const user = await this.findByfield({
      where: { username: dto.username, password: dto.password },
    });
    if (!user) throw new NotFoundException();
    const payloadclass = new payloadClass();
    payloadclass.payload.id = user.id;
    payloadclass.payload.username = user.username;

    const accessToken = this.jwtService.sign(payloadclass.payload);
    const response = new loginResDto();
    response.accessToken = accessToken;

    return response;
  }

  async findByfield(options: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(options);
  }

  async tokenValidate(payload: Payload): Promise<User | null> {
    return this.findByfield({
      where: { id: payload.id },
    });
  }
}

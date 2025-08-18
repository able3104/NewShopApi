import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { Payload } from './payload';
import { tokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(dto: UserDto): Promise<tokenDto | null> {
    const user: User | null = await this.findByfield({
      where: { username: dto.username },
    });
    if (!user) throw new Error('User not found');
    if (user.password !== dto.password) {
      throw new Error('Invalid credentials');
    }
    const payload: Payload = { id: user.id, username: user.username };

    const accessToken = this.jwtService.sign(payload);
    const tokenResponse: tokenDto = {
      accessToken,
    };

    return tokenResponse;
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

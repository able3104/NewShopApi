import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const jwt = await this.authService.validateUser(userDto);
    if (!jwt) throw new UnauthorizedException('Invalid credentials');

    return {
      accessToken: jwt.accessToken,
    };
  }
}

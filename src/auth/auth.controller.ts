import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { loginReqDto } from './dto/login.req.dto';
import { loginResDto } from './dto/login.res.dto';
import { authReqDto } from './dto/auth.req.dto';
import { authResDto } from './dto/auth.res.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth - 검증 관련 API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인' })
  // @ApiBody({ type: loginReqDto })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: loginResDto,
  })
  @ApiNotFoundResponse({
    description: '회원이 존재하지 않습니다.',
  })
  async login(@Body() dto: loginReqDto): Promise<loginResDto> {
    return await this.authService.validateUser(dto);
  }

  // // TEST CODE
  // @Get('auth')
  // @UseGuards(AuthGuard('jwt'))
  // async isAuthenticated(
  //   @Body() dto: authReqDto,
  //   @Req() req: Request,
  // ): Promise<authResDto> {
  //   const user = req['user'];
  //   return await this.authService.isAuthenticated(dto, user);
  // }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { chargeReqDto } from './dto/charge.req.dto';
import { Request } from '@nestjs/common';
import { registerReqDto } from './dto/register.req.dto';
import { registerResDto } from './dto/register.res.dto';
import { findAllReqDtoUser } from './dto/findAll.req.dto.user';
import { findAllResDtoUser } from './dto/findAll.res.dto.user';
import { findOneReqDtoUser } from './dto/findOne.req.dto.user';
import { findOneResDtoUser } from './dto/findOne.res.dto';
import { removeReqDtoUser } from './dto/remove.req.dto.user';
import { removeResDtoUser } from './dto/remove.res.dto.user';
import { chargeResDto } from './dto/charge.res.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: registerReqDto })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @ApiResponse({
    status: 400,
    description: '사용자 이름이 이미 존재합니다.',
  })
  async register(@Body() dto: registerReqDto): Promise<registerResDto> {
    return this.userService.create(dto);
  }

  // 모든 회원 조회
  @Get()
  @ApiOperation({ summary: '모든 회원 조회' })
  // @ApiBody({ type: findAllReqDtoUser })
  @ApiResponse({
    status: 200,
    description: '모든 회원 조회 성공',
    type: findAllResDtoUser,
  })
  @ApiResponse({
    status: 404,
    description: '회원이 존재하지 않습니다.',
  })
  findAll(@Body() dto: findAllReqDtoUser): Promise<findAllResDtoUser> {
    return this.userService.findAll(dto);
  }

  // 회원 상세 조회
  @Get('detail')
  @ApiOperation({ summary: '특정 회원 상세 조회' })
  @ApiBody({ type: findOneReqDtoUser })
  @ApiResponse({
    status: 200,
    description: '회원 상세 조회 성공',
    type: findOneResDtoUser,
  })
  @ApiResponse({
    status: 404,
    description: '회원이 존재하지 않습니다.',
  })
  findOne(@Body() dto: findOneReqDtoUser): Promise<findOneResDtoUser> {
    return this.userService.findOne(dto);
  }

  // 회원 탈퇴
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 회원 탈퇴' })
  // @ApiBody({ type: removeReqDtoUser })
  @ApiResponse({
    status: 200,
    description: '회원 탈퇴 성공',
    // type: removeResDtoUser,
  })
  @ApiResponse({
    status: 404,
    description: '회원이 존재하지 않습니다.',
  })
  @UseGuards(AuthGuard)
  remove(
    @Body() dto: removeReqDtoUser,
    @Req() req: Request,
  ): Promise<removeResDtoUser> {
    const user = req['user'];
    return this.userService.remove(dto, user);
  }

  // 계좌 충전
  @Post('charge')
  @ApiBearerAuth()
  @ApiOperation({ summary: '계좌 충전' })
  @ApiBody({ type: chargeReqDto })
  @ApiResponse({
    status: 200,
    description: '계좌 충전 성공',
    type: chargeResDto,
  })
  @ApiResponse({
    status: 404,
    description: '회원이 존재하지 않습니다.',
  })
  @UseGuards(AuthGuard)
  charge(
    @Body() dto: chargeReqDto,
    @Req() req: Request,
  ): Promise<chargeResDto> {
    const user = req['user'];
    return this.userService.charge(dto, user);
  }
}

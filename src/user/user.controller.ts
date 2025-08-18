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
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
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
  register(@Body() dto: registerReqDto): Promise<registerResDto> {
    return this.userService.create(dto);
  }

  // 모든 회원 조회
  @Get()
  @ApiOperation({ summary: '모든 회원 조회' })
  findAll(@Body() dto: findAllReqDtoUser): Promise<findAllResDtoUser> {
    return this.userService.findAll(dto);
  }

  // 회원 상세 조회
  @Get('detail')
  @ApiOperation({ summary: '특정 회원 상세 조회' })
  findOne(@Body() dto: findOneReqDtoUser): Promise<findOneResDtoUser> {
    return this.userService.findOne(dto);
  }

  // 회원 탈퇴
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 회원 탈퇴' })
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
  @UseGuards(AuthGuard)
  charge(
    @Body() dto: chargeReqDto,
    @Req() req: Request,
  ): Promise<chargeResDto> {
    const user = req['user'];
    return this.userService.charge(dto, user);
  }
}

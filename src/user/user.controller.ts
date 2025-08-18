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
import { createUserDto } from './dto/create.res.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChargeReqDto } from './dto/charge.req.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  register(@Body() createUserDto: createUserDto) {
    return this.userService.create(createUserDto);
  }

  // 모든 회원 조회
  @Get()
  @ApiOperation({ summary: '모든 회원 조회' })
  findAll() {
    return this.userService.findAll();
  }

  // 회원 상세 조회
  @Get(':id')
  @ApiOperation({ summary: '특정 회원 상세 조회' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  // 회원 탈퇴
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 회원 탈퇴' })
  @UseGuards(AuthGuard)
  remove(@Req() req: any) {
    return this.userService.remove(req.user);
  }

  // 계좌 충전
  @Post('charge')
  @ApiBearerAuth()
  @ApiOperation({ summary: '계좌 충전' })
  @UseGuards(AuthGuard)
  charge(@Body() dto: ChargeReqDto, @Req() req: any) {
    return this.userService.charge(dto, req.user);
  }
}

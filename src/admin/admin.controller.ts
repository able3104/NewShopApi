import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin - 관리자 API')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @ApiOperation({ summary: '관리자 회원가입' })
  register() {
    return;
  }

  @Delete()
  @ApiOperation({ summary: '관리자 회원 탈퇴' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove() {
    return;
  }

  @Get('alluser')
  @ApiOperation({ summary: '모든 회원 조회' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAllUser() {
    return;
  }

  @Get('user')
  @ApiOperation({ summary: '특정 회원 상세 조회' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findOneUser() {
    return;
  }

  @Get('allproduct')
  @ApiOperation({ summary: '모든 상품 조회' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAllProduct() {
    return;
  }

  @Get('product')
  @ApiOperation({ summary: '특정 상품 상세 조회' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findOneProduct() {
    return;
  }
}

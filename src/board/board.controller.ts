// board.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { createBoardDto } from './dto/createBoard.res.dto';
import { purchaseReqDto } from './dto/purchase.req.dto';
import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';

@ApiTags('boards')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 상품 생성 (seller만 가능)
  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 생성' })
  @UseGuards(AuthGuard)
  create(@Body() createBoardDto: createBoardDto, @Req() req: any) {
    return this.boardService.create(createBoardDto, req.user);
  }

  // 모든 상품 조회
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 상품 조회' })
  @UseGuards(AuthGuard)
  findAll() {
    return this.boardService.findAll();
  }

  // 특정 상품 상세 조회
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 상품 상세 조회' })
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.boardService.findOne(id);
  }

  // 특정 상품 삭제
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 상품 삭제 (소유자만 가능)' })
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @Req() req: any) {
    return this.boardService.remove(id, req.user as User);
  }

  // 상품 구매 (buyer만 가능)
  @Patch('purchase')
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 구매' })
  @UseGuards(AuthGuard)
  purchase(@Body() dto: purchaseReqDto, @Req() req: any) {
    return this.boardService.purchase(dto, req.user);
  }
}

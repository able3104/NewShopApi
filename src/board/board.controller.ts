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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { purchaseReqDto } from './dto/purchase.req.dto';
import { Request } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { createReqDtoBoard } from './dto/create.req.dto.Board';
import { createResDtoBoard } from './dto/create.res.dto.board';
import { findAllReqDtoBoard } from './dto/findAll.req.dto.board';
import { findAllResDtoBoard } from './dto/findAll.res.dto.board';
import { findOneReqDtoBoard } from './dto/findOne.req.dto.Board';
import { findOneResDtoBoard } from './dto/findOne.res.dto.board';
import { removeReqDtoBoard } from './dto/remove.req.dto.board';
import { removeResDtoBoard } from './dto/remove.res.dto.board';
import { purchaseResDto } from './dto/purchase.res.dto';

@ApiTags('boards')
@UseGuards(AuthGuard)
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 상품 생성 (seller만 가능)
  @Post('create')
  @ApiBearerAuth()
  @ApiOkResponse({})
  @ApiOperation({ summary: '상품 생성' })
  create(
    @Body() dto: createReqDtoBoard,
    @Req() req: Request,
  ): Promise<createResDtoBoard> {
    const user = req['user'] as User;
    return this.boardService.create(dto, user);
  }

  // 모든 상품 조회
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: '모든 상품 조회' })
  findAll(@Body() dto: findAllReqDtoBoard): Promise<findAllResDtoBoard> {
    return this.boardService.findAll(dto);
  }

  // 특정 상품 상세 조회
  @Get('detail')
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 상품 상세 조회' })
  findOne(@Body() dto: findOneReqDtoBoard): Promise<findOneResDtoBoard> {
    return this.boardService.findOne(dto);
  }

  // 특정 상품 삭제
  @Delete('')
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 상품 삭제 (소유자만 가능)' })
  remove(
    @Body() dto: removeReqDtoBoard,
    @Req() req: Request,
  ): Promise<removeResDtoBoard> {
    const user = req['user'] as User;
    return this.boardService.remove(dto, user);
  }

  // 상품 구매 (buyer만 가능)
  @Patch('purchase')
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 구매' })
  purchase(
    @Body() dto: purchaseReqDto,
    @Req() req: Request,
  ): Promise<purchaseResDto> {
    const user = req['user'] as User;
    return this.boardService.purchase(dto, user);
  }
}

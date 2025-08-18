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
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { purchaseReqDto } from './dto/purchase.req.dto';
import { Request } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { createReqDtoBoard } from './dto/create.req.dto.board';
import { createResDtoBoard } from './dto/create.res.dto.board';
import { findAllReqDtoBoard } from './dto/findAll.req.dto.board';
import { findAllResDtoBoard } from './dto/findAll.res.dto.board';
import { findOneReqDtoBoard } from './dto/findOne.req.dto.board';
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
  @ApiOperation({ summary: '상품 생성' })
  @ApiBody({ type: createReqDtoBoard })
  @ApiResponse({
    status: 201,
    description: '상품 생성 성공',
    type: createResDtoBoard,
  })
  @ApiResponse({
    status: 404,
    description: '상품 생성 실패',
  })
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
  @ApiBody({ type: findAllReqDtoBoard })
  @ApiResponse({
    status: 200,
    description: '모든 상품 조회 성공',
    type: findAllResDtoBoard,
  })
  @ApiResponse({
    status: 404,
    description: '상품이 존재하지 않습니다.',
  })
  findAll(@Body() dto: findAllReqDtoBoard): Promise<findAllResDtoBoard> {
    return this.boardService.findAll(dto);
  }

  // 특정 상품 상세 조회
  @Get('detail')
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 상품 상세 조회' })
  @ApiBody({ type: findOneReqDtoBoard })
  @ApiResponse({
    status: 200,
    description: '특정 상품 상세 조회 성공',
    type: findOneResDtoBoard,
  })
  @ApiResponse({
    status: 404,
    description: '상품이 존재하지 않습니다.',
  })
  findOne(@Body() dto: findOneReqDtoBoard): Promise<findOneResDtoBoard> {
    return this.boardService.findOne(dto);
  }

  // 특정 상품 삭제
  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: '특정 상품 삭제 (소유자만 가능)' })
  @ApiBody({ type: removeReqDtoBoard })
  @ApiResponse({
    status: 200,
    description: '상품 삭제 성공',
  })
  @ApiResponse({
    status: 404,
    description: '상품이 존재하지 않습니다.',
  })
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

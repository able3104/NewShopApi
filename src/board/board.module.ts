import { Module, forwardRef } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { Board } from './entity/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    forwardRef(() => UserModule),
    AuthModule,
    ConfigModule,
  ],
  controllers: [BoardController],
  providers: [
    BoardService,
    {
      provide: 'BOARD_CONFIG',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        jwtSecret: config.get<string>('JWT_SECRET'),
        jwtExp: config.get<string>('JWT_EXPIRATION_TIME'),
      }),
    },
  ],
  exports: [BoardService],
})
export class BoardModule {}

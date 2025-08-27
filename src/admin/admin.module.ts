import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entity/board.entity';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    AuthModule,
    ConfigModule,
    forwardRef(() => UserModule),
  ],
  providers: [
    AdminService,
    {
      provide: 'ADMIN_CONFIG',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        jwtSecret: config.get<string>('JWT_SECRET'),
        jwtExp: config.get<string>('JWT_EXPIRATION_TIME'),
      }),
    },
  ],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { BoardModule } from './board/board.module';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // ConfigModule을 전역으로 설정하여 모든 모듈에서 사용 가능하게 함
//     }),
//     TypeOrmModule.forRootAsync({
//       useFactory: () => ({
//         type: 'mariadb',
//         host: process.env.DB_HOST,
//         port: Number(process.env.DB_PORT),
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         autoLoadEntities: true,
//         synchronize: true, // 개발 단계에서만 true로 설정. 운영 환경에서는 false로 해야 합니다.
//       }),
//     }),
//     // TypeOrmModule.forRoot({
//     //   type: 'mariadb',
//     //   host: 'localhost',
//     //   port: 3306,
//     //   username: 'qwer',
//     //   password: '3104',
//     //   database: 'test',
//     //   autoLoadEntities: true,
//     //   synchronize: true, // 개발 단계에서만 true로 설정. 운영 환경에서는 false로 해야 합니다.
//     // }),
//     BoardModule,
//     UserModule,
//     AuthModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    BoardModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

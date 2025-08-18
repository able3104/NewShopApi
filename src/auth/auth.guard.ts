// auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Payload } from './payload';
import { payloadClass } from './payload.class';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    const token = authHeader.split(' ')[1];

    try {
      const payload: Payload = await this.jwtService.verify(token);
      const userPayload = new payloadClass();
      userPayload.payload.id = payload.id;
      userPayload.payload.username = payload.username;
      request['user'] = userPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

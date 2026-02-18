import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import type { Response as ExpressResponse } from 'express';

const ONE_HOUR_MS = 60 * 60 * 1000;
const HALF_HOUR = 30 * 60;

@Injectable()
export class TokenRefreshInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<ExpressResponse>();
    const user = request.user;

    if (!user || !request.cookies['access_token']) {
      return next.handle();
    }

    const token = request.cookies['access_token'];
    const payload = this.jwtService.decode(token) as any;

    if (payload && payload.exp) {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = payload.exp - now;

      if (timeLeft < HALF_HOUR) {
        const newToken = this.jwtService.sign({
          sub: user.sub || user.id,
          email: user.email,
        });

        response.cookie('access_token', newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: ONE_HOUR_MS,
        });
      }
    }

    return next.handle();
  }
}

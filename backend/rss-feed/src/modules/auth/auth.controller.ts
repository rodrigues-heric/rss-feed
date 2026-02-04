import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response as ExpressResponse } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

interface AuthenticatedUser {
  id: string;
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async getMe(@GetUser() user: AuthenticatedUser) {
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async logout(@Res({ passthrough: true }) response: ExpressResponse) {
    return this.authService.logout(response);
  }
}

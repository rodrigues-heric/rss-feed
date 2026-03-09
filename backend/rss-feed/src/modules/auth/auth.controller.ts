import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response as ExpressResponse } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { LoginDto } from './dto/login.dto';
import type { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { TokenRefreshInterceptor } from 'src/common/interceptors/token-refresh.interceptor';
import { ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user is logged in.',
  })
  @ApiCookieAuth()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TokenRefreshInterceptor)
  public async getMe(@GetUser() user: AuthenticatedUser) {
    return user;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user logged in successfully.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    return this.authService.login(loginDto.email, loginDto.password, response);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user logged out successfully.',
  })
  @ApiCookieAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TokenRefreshInterceptor)
  public async logout(@Res({ passthrough: true }) response: ExpressResponse) {
    return this.authService.logout(response);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenRefreshInterceptor } from 'src/common/interceptors/token-refresh.interceptor';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerDto: RegisterDto) {
    return this.usersService.createUser(registerDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User subscriptions successfully fecthed.',
  })
  @Get('subscriptions')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TokenRefreshInterceptor)
  @ApiCookieAuth()
  public async getSubscriptions(@GetUser('sub') userId: string) {
    return this.usersService.getUserSubscriptions(userId);
  }
}

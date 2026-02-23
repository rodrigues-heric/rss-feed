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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() registerDto: RegisterDto) {
    return this.usersService.createUser(registerDto);
  }

  @Get('subscriptions')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TokenRefreshInterceptor)
  public async getSubscriptions(@GetUser('sub') userId: string) {
    return this.usersService.getUserSubscriptions(userId);
  }
}

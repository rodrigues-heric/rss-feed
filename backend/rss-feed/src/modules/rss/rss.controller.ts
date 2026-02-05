import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RssService } from './rss.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenRefreshInterceptor } from 'src/common/interceptors/token-refresh.interceptor';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateRssDto } from './dto/create-rss.dto';
import type { PostRssResponse } from './interfaces/post-rss-response.interface';

@Controller('rss')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TokenRefreshInterceptor)
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  public async postSubscribeUrl(
    @GetUser('sub') userId: string,
    @Body() createRssDto: CreateRssDto,
  ): Promise<PostRssResponse> {
    return this.rssService.addFeedToUser(userId, createRssDto.url);
  }

  @Get('feeds')
  @HttpCode(HttpStatus.OK)
  public async getFeeds(): Promise<any> {
    console.log('Getting feeds');
    return { success: true, message: 'Feeds fetched successfully' };
  }

  @Delete('feed/:id')
  @HttpCode(HttpStatus.OK)
  public async deleteFeed(@Param('id') id: string): Promise<any> {
    console.log(`Deleting feed with id: ${id}`);
    return { success: true, message: 'Feed deleted successfully' };
  }
}

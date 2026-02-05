import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RssService } from './rss.service';

interface SuccessResponse {
  success: boolean;
  message: string;
}

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Post('feed')
  @HttpCode(HttpStatus.CREATED)
  public async postFeedUrl(): Promise<SuccessResponse> {
    console.log('Posting feed url');
    return { success: true, message: 'Feed posted successfully' };
  }

  @Get('feeds')
  @HttpCode(HttpStatus.OK)
  public async getFeeds(): Promise<SuccessResponse> {
    console.log('Getting feeds');
    return { success: true, message: 'Feeds fetched successfully' };
  }

  @Delete('feed/:id')
  @HttpCode(HttpStatus.OK)
  public async deleteFeed(@Param('id') id: string): Promise<SuccessResponse> {
    console.log(`Deleting feed with id: ${id}`);
    return { success: true, message: 'Feed deleted successfully' };
  }
}

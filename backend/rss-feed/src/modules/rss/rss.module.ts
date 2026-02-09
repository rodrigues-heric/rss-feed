import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/infra/mongodb/schemas/users.schema';
import {
  FeedSource,
  FeedSourceSchema,
} from 'src/infra/mongodb/schemas/feed-source.schema';
import { JwtService } from '@nestjs/jwt';
import { News, NewsSchema } from 'src/infra/mongodb/schemas/news.schema';

@Module({
  controllers: [RssController],
  providers: [RssService, JwtService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: FeedSource.name, schema: FeedSourceSchema },
      { name: News.name, schema: NewsSchema },
    ]),
  ],
  exports: [RssService],
})
export class RssModule {}

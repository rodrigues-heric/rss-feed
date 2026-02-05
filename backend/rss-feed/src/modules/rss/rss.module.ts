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

@Module({
  controllers: [RssController],
  providers: [RssService, JwtService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: FeedSource.name, schema: FeedSourceSchema },
    ]),
  ],
  exports: [RssService],
})
export class RssModule {}

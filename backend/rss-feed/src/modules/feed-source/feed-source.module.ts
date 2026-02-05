import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FeedSource,
  FeedSourceSchema,
} from 'src/infra/mongodb/schemas/feed-source.schema';
import { FeedSourceService } from './feed-source.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeedSource.name, schema: FeedSourceSchema },
    ]),
  ],
  providers: [FeedSourceService],
  exports: [FeedSourceService],
})
export class FeedSourceModule {}

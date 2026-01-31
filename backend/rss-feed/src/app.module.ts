import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './modules/rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://localhost/rss-feed',
    ),
    RssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

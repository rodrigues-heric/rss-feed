import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './modules/rss/rss.module';

@Module({
  imports: [RssModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

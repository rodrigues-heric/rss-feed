import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssModule } from './modules/rss/rss.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { FeedSourceModule } from './modules/feed-source/feed-source.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    RssModule,
    AuthModule,
    UsersModule,
    FeedSourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

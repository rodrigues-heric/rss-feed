import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeedSource } from 'src/infra/mongodb/schemas/feed-source.schema';
import { User } from 'src/infra/mongodb/schemas/users.schema';
import { DeleteRssResponse } from './interfaces/delete-rss-response.interface';
import { News } from 'src/infra/mongodb/schemas/news.schema';
import { PostRssResponse } from './interfaces/post-rss-response.interface';
import { GetNewsResponse } from './interfaces/get-rss-response.interface';
import { Cron } from '@nestjs/schedule';

const CRON_15_MIN = '0 */15 * * * *';

@Injectable()
export class RssService {
  private readonly queueTasks = 'rss_tasks';
  private client: ClientProxy;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(FeedSource.name) private feedModel: Model<FeedSource>,
    @InjectModel(News.name) private newsModel: Model<News>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: this.queueTasks,
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  @Cron(CRON_15_MIN)
  private async _handleCronUpdateFeeds(): Promise<void> {
    const sources = await this.feedModel.find().exec();

    if (sources.length === 0) {
      return;
    }

    for (const source of sources) {
      this.client.emit(this.queueTasks, {
        url: source.url,
      });
    }
  }

  public async addFeedToUser(
    userId: string,
    url: string,
  ): Promise<PostRssResponse> {
    const urlLower = url.toLocaleLowerCase();
    const userIdObj = new Types.ObjectId(userId);
    const feedSource = await this.feedModel
      .findOneAndUpdate(
        { url: urlLower },
        { url: urlLower },
        { upsert: true, new: true },
      )
      .exec();

    const result = await this.userModel
      .findByIdAndUpdate(
        userIdObj,
        {
          $addToSet: { feeds: feedSource._id },
        },
        {
          new: true,
        },
      )
      .exec();

    this.client.emit(this.queueTasks, {
      url: feedSource.url,
    });

    return {
      message: 'Feed added successfully',
      feedId: feedSource._id,
      url: feedSource.url,
    };
  }

  public async deleteFeedFromUser(
    userId: string,
    feedId: string,
  ): Promise<DeleteRssResponse> {
    const userIdObj = new Types.ObjectId(userId);
    const feedIdObj = new Types.ObjectId(feedId);

    const result = await this.userModel
      .findByIdAndUpdate(
        userIdObj,
        {
          $pull: { feeds: feedIdObj },
        },
        {
          new: true,
        },
      )
      .exec();

    if (!result) throw new NotFoundException('User not found');

    return {
      message: 'Feed deleted successfully',
      feedId: feedIdObj.toString(),
    };
  }

  public async getNewsForUser(
    userId: string,
    page: number = 1,
  ): Promise<GetNewsResponse> {
    const limit = 20;
    const skip = (page - 1) * limit;
    const userIdObj = new Types.ObjectId(userId);

    const user = await this.userModel
      .findById(userIdObj)
      .select('feeds')
      .exec();
    if (!user) throw new NotFoundException('User not found');

    const sources = await this.feedModel
      .find({
        _id: { $in: user.feeds },
      })
      .select('url')
      .exec();

    const sourceUrls = sources.map((s) => s.url);

    const [news, total] = await Promise.all([
      this.newsModel
        .find({ sourceUrl: { $in: sourceUrls } })
        .sort({ pubDate: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.newsModel.countDocuments({ sourceUrl: { $in: sourceUrls } }),
    ]);

    return {
      data: news,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
      },
    };
  }
}

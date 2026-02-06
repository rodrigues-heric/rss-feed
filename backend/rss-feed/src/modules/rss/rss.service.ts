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

@Injectable()
export class RssService {
  private readonly queueTasks = 'rss_tasks';
  private client: ClientProxy;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(FeedSource.name) private feedModel: Model<FeedSource>,
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

  public async addFeedToUser(userId: string, url: string) {
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
}

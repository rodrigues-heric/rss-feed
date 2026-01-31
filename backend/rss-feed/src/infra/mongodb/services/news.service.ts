import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../schemas/news.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  public async saveMany(newsItems: any[], sourceUrl: string) {
    const operations = newsItems.map((item) => ({
      updateOne: {
        filter: { guid: item.guid || item.link },
        update: {
          $set: {
            ...item,
            sourceUrl,
            pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
          },
        },
        upsert: true,
      },
    }));

    return this.newsModel.bulkWrite(operations);
  }
}

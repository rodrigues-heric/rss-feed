import { Types } from 'mongoose';

export interface PostRssResponse {
  message: string;
  feedId: Types.ObjectId;
  url: any;
}

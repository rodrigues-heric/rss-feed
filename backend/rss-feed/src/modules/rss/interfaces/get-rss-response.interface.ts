import { Types } from 'mongoose';
import { News } from 'src/infra/mongodb/schemas/news.schema';

export interface GetNewsResponse {
  data: (import('mongoose').Document<
    unknown,
    {},
    News,
    {},
    import('mongoose').DefaultSchemaOptions
  > &
    News &
    Required<{ _id: Types.ObjectId }> & { __v: number } & { id: string })[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNextPage: boolean;
  };
}

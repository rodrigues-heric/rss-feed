import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class News extends Document {
  @Prop({ required: true, unique: true })
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop()
  author: string;

  @Prop()
  pubDate: Date;

  @Prop({ type: Object })
  content: any;

  @Prop({ required: true, index: true })
  sourceUrl: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);

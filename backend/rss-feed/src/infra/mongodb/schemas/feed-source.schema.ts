import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class FeedSource extends Document {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop()
  title: string;
}
export const FeedSourceSchema = SchemaFactory.createForClass(FeedSource);

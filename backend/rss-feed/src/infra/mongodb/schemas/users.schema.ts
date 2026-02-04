import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'FeedSource' }] })
  feeds: Types.ObjectId[];
}
export const UserSchema = SchemaFactory.createForClass(User);

@Schema()
export class FeedSource extends Document {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop()
  title: string;
}
export const FeedSourceSchema = SchemaFactory.createForClass(FeedSource);

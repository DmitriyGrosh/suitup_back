import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

import { User } from '../user/user.schema';
import { Transform, Type } from 'class-transformer';
import { Category } from '../category/category.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop({
    set: (content: string) => {
      return content.trim();
    },
  })
  content: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

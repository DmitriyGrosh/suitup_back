import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Address, AddressSchema } from '../address/address.schema';
import { Category } from '../category/category.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop()
  refreshToken: string;

  @Prop()
  email: string;

  @Prop({ type: AddressSchema })
  @Type(() => Address)
  address: Address;

  @Prop({ type: Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category;
}

export const UserSchema = SchemaFactory.createForClass(User);

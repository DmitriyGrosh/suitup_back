import { Prop, Schema, SchemaFactory, PropOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  })
  _id?: string;

  @Prop()
  currentHashedRefreshToken?: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  image: string;

  @Prop()
  isRegisteredWithGoogle: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

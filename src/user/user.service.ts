import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { UserFindDto } from './dto/userFindDto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        currentHashedRefreshToken,
      },
    );
  }
  async findUser(email: string) {
    const user = await this.userModel.findOne({ email: email });

    return user;
  }

  async saveUser({ name, image, email, isRegisteredWithGoogle }: UserFindDto) {
    const newUser = new this.userModel({
      email,
      name,
      image,
      isRegisteredWithGoogle,
    });
    await newUser.save();
    return newUser;
  }
}

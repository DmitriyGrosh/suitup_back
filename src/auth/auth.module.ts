import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { AccessTokenStrategy } from '../strategy/access.strategy';
import { RefreshTokenStrategy } from '../strategy/refresh.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      // secret: process.env.JWT_ACCESS_SECRET,
      // signOptions: {
      //   expiresIn: '60d',
      // },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UserService,
  ],
})
export class AuthModule {}

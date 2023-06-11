import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
// import { HashService } from './hash.service';
// import { AuthService } from '../auth/auth.service';
// import { JwtStrategy } from '../strategy/jwt.strategy';
// import { LocalStrategy } from '../strategy/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    // HashService,
    // AuthService,
    // JwtStrategy,
    // LocalStrategy,
  ],
  // exports: [UserService, HashService],
})
export class UserModule {}

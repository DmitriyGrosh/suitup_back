import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { TokenPayloadDto } from './dto/tokenPayloadDto';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayloadDto = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  getCookieWithJwtAccessToken(
    userId: string,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayloadDto = { userId, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  async getUserData(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const data = ticket.getPayload();

    return data;
  }

  async getCookiesForUser(user: User) {
    const accessTokenCookie = this.getCookieWithJwtAccessToken(user._id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(user._id);

    await this.userService.setCurrentRefreshToken(refreshToken, user._id);

    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException();
    }

    const { accessTokenCookie, refreshTokenCookie } =
      await this.getCookiesForUser(user);

    return {
      accessTokenCookie,
      refreshTokenCookie,
      user,
    };
  }

  async createWithGoogle(email: string, name: string, picture: string) {
    const newUser = {
      email,
      name,
      image: picture,
      isRegisteredWithGoogle: true,
    };

    await this.userService.saveUser(newUser);
    return newUser;
  }

  async registerUser(token: string, email: string, picture: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;

    const user = await this.createWithGoogle(email, name, picture);

    return this.handleRegisteredUser(user);
  }

  async login(token: string) {
    const tokenInfo = await this.getUserData(token);

    const { email, picture } = tokenInfo;

    try {
      const user = await this.userService.findUser(email);

      if (user === null) {
        return this.registerUser(token, email, picture);
      }

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, email, picture);
    }
  }
}

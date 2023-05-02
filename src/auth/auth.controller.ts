import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenVerificationDto } from './dto/tokenVerificationDto';
import { response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request,
  ): Promise<any> {
    const { token } = tokenData;

    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.authService.login(token);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }
}

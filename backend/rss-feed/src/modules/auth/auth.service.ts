import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Response as ExpressResponse } from 'express';

const ONE_HOUR_MS = 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login(email: string, pass: string, response: ExpressResponse) {
    const user = await this.usersService.findOneByEmailWithPassword(email);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
    });

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ONE_HOUR_MS,
    });

    return { message: 'Login successful!' };
  }

  public async logout(response: ExpressResponse) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Logout successful!' };
  }
}

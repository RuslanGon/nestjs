import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // регистрация (возвращаем user без пароля)
  async register(dto: { name: string; email: string; password: string }) {
    try {
      const user = await this.usersService.create(dto);
      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      throw new BadRequestException(err.message || 'Registration failed');
    }
  }

  // логин — проверяем пользователя и возвращаем токен + данные пользователя
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Неверный email или пароль');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Неверный email или пароль');

    const payload = { sub: user.id, email: user.email, name: user.name };

    // возвращаем и токен, и данные пользователя
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

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
    // UsersService.create уже хэширует пароль — если не хэширует, хэшируем здесь
    try {
      const user = await this.usersService.create(dto);
      // убрать пароль перед возвратом
      // @ts-ignore
      const { password, ...rest } = user;
      return rest;
    } catch (err) {
      // можно обработать дубликаты и вернуть читаемое сообщение
      throw new BadRequestException(err.message || 'Registration failed');
    }
  }

  // проверить логин и вернуть токен
  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Неверный email или пароль');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Неверный email или пароль');

    const payload = { sub: user.id, email: user.email }; // стандартно: sub = subject = userId
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

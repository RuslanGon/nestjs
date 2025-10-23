import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService, // ✅ добавляем UsersService
  ) {}

  // ✅ Регистрация: POST /auth/register
  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.authService.register(body);
  }

  // ✅ Логин: POST /auth/login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  // ✅ Получить текущего пользователя: GET /auth/me
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    // req.user.sub приходит из JwtStrategy
    return this.usersService.findById(req.user.sub);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Получить все анализы крови
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  // Создать новый анализ (требует авторизации)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any, @GetUser() user: User) {
    return this.postsService.create(body, user.id);
  }

  // Обновить анализ
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @GetUser() user: User) {
    return this.postsService.update(+id, body, user.id);
  }

  // Удалить анализ
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.postsService.remove(+id, user.id);
  }
}

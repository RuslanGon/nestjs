import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Все посты можно получать без авторизации
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  // Создание поста — только авторизованные
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: { title: string; content: string },
    @GetUser() user: User,
  ) {
    return this.postsService.create(body.title, body.content, user.id);
  }

  // Обновление поста — только авторизованные
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; content?: string },
    @GetUser() user: User,
  ) {
    return this.postsService.update(+id, body, user.id);
  }

  // Удаление поста — только авторизованные
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.postsService.remove(+id, user.id);
  }
}

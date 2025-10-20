import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Получить все посты
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  // Создать новый пост
  @Post()
  create(@Body() body: { title: string; content: string; userId: number }) {
    return this.postsService.create(body.title, body.content, body.userId);
  }
}

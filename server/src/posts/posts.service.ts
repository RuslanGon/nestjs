import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Получить все посты с авторами
  findAll() {
    return this.postsRepository.find({ relations: ['author'] });
  }

// Создать пост
  async create(title: string, content: string, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with id=${userId} not found`);
    }

    const post = this.postsRepository.create({
      title,
      content,
      author: user,
    });

    return this.postsRepository.save(post);
  }

  //  Метод обновления поста
  async update(postId: number, body: { title?: string; content?: string }, userId: number) {
    const post = await this.postsRepository.findOne({ where: { id: postId }, relations: ['author'] });
    if (!post) throw new Error(`Post with id=${postId} not found`);
    if (post.author.id !== userId) throw new Error(`You are not the author of this post`);
  
    post.title = body.title ?? post.title;
    post.content = body.content ?? post.content;
  
    return this.postsRepository.save(post);
  }

//  Удаления поста
async remove(postId: number, userId: number) {
  const post = await this.postsRepository.findOne({ where: { id: postId }, relations: ['author'] });
  if (!post) throw new Error(`Post with id=${postId} not found`);
  if (post.author.id !== userId) throw new Error(`You are not the author of this post`);

  await this.postsRepository.delete(postId);
  return { message: 'Post deleted' };
}
}


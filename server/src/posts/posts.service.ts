import { Injectable } from '@nestjs/common';
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
}


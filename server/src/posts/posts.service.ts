import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  // Получить все анализы
  findAll() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  // Создать анализ
  async create(data: any, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`User with id=${userId} not found`);

    const post = this.postsRepository.create({
      ...data,
      author: user,
    });

    return this.postsRepository.save(post);
  }

  // Обновить анализ (если нужно)
  async update(postId: number, body: any, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) throw new NotFoundException(`Analysis not found`);
    if (post.author.id !== userId) throw new ForbiddenException(`Not your record`);

    Object.assign(post, body);

    return this.postsRepository.save(post);
  }

  // Удалить анализ
  async remove(postId: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['author'],
    });

    if (!post) throw new NotFoundException(`Analysis not found`);
    if (post.author.id !== userId) throw new ForbiddenException(`Not your record`);

    await this.postsRepository.delete(postId);
    return { message: 'Analysis deleted successfully' };
  }
}

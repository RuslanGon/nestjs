import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => rest); 
  }

  async create(user: Partial<User>) {
    const exists = await this.userRepository.findOneBy({ email: user.email });
    if (exists) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }
  
    const newUser = this.userRepository.create(user);
    newUser.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.save(newUser);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Пользователь с id=${id} не найден`);
    }
    await this.userRepository.delete(id);
    return { message: `Пользователь с id=${id} удалён` };
  }
}

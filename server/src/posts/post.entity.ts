import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hemoglobin: string;

  @Column()
  erythrocytes: string;

  @Column()
  leukocytes: string;

  @Column()
  platelets: string;

  @Column()
  hematocrit: string;

  @Column()
  glucose: string;

  @Column()
  bilirubin: string;

  @Column()
  cholesterol: string;

  @Column()
  protein: string;

  @Column()
  gender: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;
}

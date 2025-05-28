// src/quiz/entities/quiz.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  optionA: string;

  @Column()
  optionB: string;

  @Column()
  optionC: string;

  @Column()
  optionD: string;

  @Column()
  correctAnswer: string;

  @ManyToOne(() => Room, (room) => room.quizzes)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column({ nullable: true })
  roomId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

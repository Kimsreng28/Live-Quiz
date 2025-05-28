// src/room/entities/room.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from '../../quiz/entities/quiz.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; // 6-digit OTP code

  @OneToMany(() => Quiz, (quiz) => quiz.room)
  quizzes: Quiz[];

  @Column({ default: 0 })
  currentQuizIndex: number;

  @Column({ nullable: true })
  currentQuizEndTime: Date;

  @Column({ default: 30 }) // Default 30 seconds per quiz
  quizDuration: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  attempts: Record<string, number>;

  @Column({ type: 'jsonb', nullable: true })
  players: Array<{ id: string; name: string }>;

  @Column({ type: 'jsonb', nullable: true })
  scores: Record<string, number>;

  @Column({ type: 'jsonb', nullable: true })
  answerStats: Record<number, Record<string, number>>; // quizId -> answer -> count

  @Column({ type: 'boolean', default: false })
  isActive: boolean;
}

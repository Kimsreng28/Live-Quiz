// src/room/room.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../quiz/entities/quiz.entity';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async createRoom(quizzes: Quiz[], duration: number = 30): Promise<Room> {
    const room = new Room();
    room.code = this.generateOTP();
    room.quizDuration = duration;
    room.currentQuizIndex = 0;
    room.currentQuizEndTime = new Date(Date.now() + duration * 1000);

    const savedRoom = await this.roomRepository.save(room);

    // Associate quizzes with the room
    for (const quiz of quizzes) {
      quiz.room = savedRoom;
      await this.quizRepository.save(quiz);
    }

    return savedRoom;
  }

  async getCurrentQuiz(
    roomCode: string,
  ): Promise<{ quiz: Quiz; endTime: Date } | null> {
    const room = await this.roomRepository.findOne({
      where: { code: roomCode },
      relations: ['quizzes'],
    });

    if (!room || !room.quizzes || room.quizzes.length === 0) {
      return null;
    }

    return {
      quiz: room.quizzes[room.currentQuizIndex],
      endTime: room.currentQuizEndTime,
    };
  }

  async moveToNextQuiz(
    roomCode: string,
  ): Promise<{ quiz: Quiz; endTime: Date } | null> {
    const room = await this.roomRepository.findOne({
      where: { code: roomCode },
      relations: ['quizzes'],
    });

    if (
      !room ||
      !room.quizzes ||
      room.currentQuizIndex >= room.quizzes.length - 1
    ) {
      return null;
    }

    room.currentQuizIndex++;
    room.currentQuizEndTime = new Date(Date.now() + room.quizDuration * 1000);
    await this.roomRepository.save(room);

    return {
      quiz: room.quizzes[room.currentQuizIndex],
      endTime: room.currentQuizEndTime,
    };
  }

  async findRoomByCode(code: string): Promise<Room | null> {
    return await this.roomRepository.findOne({
      where: { code },
      relations: ['quizzes'],
    });
  }

  async getUserAttempts(userId: string, roomCode: string): Promise<number> {
    const room = await this.roomRepository.findOne({
      where: { code: roomCode },
    });

    if (!room) {
      throw new Error('Room not found');
    }

    // Initialize attempts object if it doesn't exist
    if (!room.attempts) {
      room.attempts = {};
    }

    // Return the attempts for this user (default to 0 if not found)
    return room.attempts[userId] || 0;
  }

  async incrementUserAttempts(userId: string, roomCode: string): Promise<void> {
    const room = await this.roomRepository.findOne({
      where: { code: roomCode },
    });

    if (!room) {
      throw new Error('Room not found');
    }

    // Initialize attempts object if it doesn't exist
    if (!room.attempts) {
      room.attempts = {};
    }

    // Increment or initialize the user's attempts
    room.attempts[userId] = (room.attempts[userId] || 0) + 1;

    await this.roomRepository.save(room);
  }
}

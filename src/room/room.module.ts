// src/room/room.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { Room } from './entities/room.entity';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Quiz])],
  providers: [RoomService],
  exports: [RoomService], // This is crucial!
})
export class RoomModule {}

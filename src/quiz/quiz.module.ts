import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from 'src/room/entities/room.entity';
import { RoomModule } from 'src/room/room.module';
import { Quiz } from './entities/quiz.entity';
import { QuizController } from './quiz.controller';
import { QuizGateway } from './quiz.gateway';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Room]), RoomModule],
  controllers: [QuizController],
  providers: [QuizService, QuizGateway],
})
export class QuizModule {}

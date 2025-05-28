import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { RoomService } from 'src/room/room.service';
import { Quiz } from './entities/quiz.entity';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly roomService: RoomService,
  ) {}

  @Post()
  async createQuiz(
    @Body()
    body: {
      question: string;
      options: string[];
      correctAnswer: string;
    },
  ): Promise<Quiz> {
    console.log(body); // Log the body to inspect the incoming request
    const createQuizDto = {
      question: body.question,
      options: body.options,
      correctAnswer: body.correctAnswer,
    };
    return this.quizService.create(createQuizDto);
  }

  @Post('create-room')
  async createRoomWithQuizzes(
    @Body() body: { quizIds: number[]; duration?: number },
  ): Promise<{ code: string }> {
    const quizzes = await Promise.all(
      body.quizIds.map((id) => this.quizService.findOne(id)),
    );
    const validQuizzes = quizzes.filter((q): q is Quiz => q !== null);

    if (validQuizzes.length === 0) {
      throw new BadRequestException('No valid quizzes found');
    }

    const room = await this.roomService.createRoom(validQuizzes, body.duration);
    return { code: room.code };
  }

  @Get()
  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }
}

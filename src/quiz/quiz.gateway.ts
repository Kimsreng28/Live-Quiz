import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/room/room.service';
import { Quiz } from './entities/quiz.entity';
import { QuizService } from './quiz.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class QuizGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private roomTimers = new Map<string, NodeJS.Timeout>();

  constructor(
    @Inject(QuizService)
    private readonly quizService: QuizService,
    @Inject(RoomService) private readonly roomService: RoomService,
  ) {}

  async afterInit() {
    // Emit all quizzes on startup
    const quizzes = await this.quizService.findAll();
    this.server.emit('quizList', quizzes);
    console.log('quizList', quizzes);
  }

  // Join Room
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() { code, clientId }: { code: string; clientId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Client ${clientId} joining room ${code}`);

    try {
      const room = await this.roomService.findRoomByCode(code);
      if (!room) {
        return { success: false, error: 'Room not found' };
      }

      const attempts = await this.roomService.getUserAttempts(clientId, code);

      client.join(`room_${code}`);
      console.log(`Client ${clientId} successfully joined room ${code}`);
      return { success: true, attempts };
    } catch (error) {
      console.error('Error joining room:', error);
      return { success: false, error: 'Internal server error' };
    }
  }

  // Create Room With Quizzes
  @SubscribeMessage('createRoomWithQuizzes')
  async handleCreateRoomWithQuizzes(
    @MessageBody()
    { quizIds, duration }: { quizIds: number[]; duration?: number },
    @ConnectedSocket() client: Socket,
  ): Promise<{ code: string }> {
    console.log(
      'Received createRoomWithQuizzes request with quiz IDs:',
      quizIds,
    );

    try {
      // Log and fetch each quiz individually
      console.log('Fetching quizzes from database...');
      const quizzes = await Promise.all(
        quizIds.map(async (id) => {
          console.log(`Fetching quiz with ID: ${id}`);
          const quiz = await this.quizService.findOne(id);
          console.log(`Quiz ${id} fetch result:`, quiz ? 'Found' : 'Not found');
          return quiz;
        }),
      );

      // Log raw results before filtering
      console.log('Raw quiz fetch results:', quizzes);

      // Filter out null quizzes with proper type guard
      const validQuizzes = quizzes.filter((q): q is Quiz => q !== null);

      // Log validation results
      console.log(
        `Validation complete. Found ${validQuizzes.length} valid quizzes:`,
      );
      validQuizzes.forEach((q) =>
        console.log(
          `- Quiz ID: ${q.id}, Question: "${q.question.substring(0, 30)}${q.question.length > 30 ? '...' : ''}"`,
        ),
      );

      if (validQuizzes.length === 0) {
        console.error('No valid quizzes found for provided IDs');
        throw new Error('No valid quizzes found');
      }

      if (validQuizzes.length !== quizIds.length) {
        console.warn(
          `Warning: Only ${validQuizzes.length} of ${quizIds.length} quizzes were valid`,
        );
      }

      // Create room with valid quizzes
      console.log(`Creating room with ${validQuizzes.length} quizzes...`);
      const room = await this.roomService.createRoom(validQuizzes, duration);
      console.log(`Room created successfully with code: ${room.code}`);

      // Update all clients with the latest quiz list
      console.log('Updating quiz list for all clients...');
      const updatedQuizzes = await this.quizService.findAll();
      this.server.emit('quizList', updatedQuizzes);
      console.log('Quiz list update complete');

      return { code: room.code };
    } catch (error) {
      console.error('Error in createRoomWithQuizzes:', error);
      throw error; // Re-throw to send error to client
    }
  }

  // Start Quiz
  @SubscribeMessage('startQuiz')
  async handleStartQuiz(@MessageBody() { code }: { code: string }) {
    console.log(`Starting quiz for room ${code}`);

    const room = await this.roomService.findRoomByCode(code);
    if (!room) {
      throw new Error('Room not found');
    }

    // Debug log all quizzes in room
    console.log(`Room ${code} contains ${room.quizzes.length} quizzes:`);
    room.quizzes.forEach((quiz, index) => {
      console.log(
        `Quiz ${index + 1}: ID ${quiz.id} - "${quiz.question.substring(0, 30)}..."`,
      );
    });

    const currentQuiz = await this.roomService.getCurrentQuiz(code);
    if (!currentQuiz) {
      throw new Error('No current quiz found');
    }

    const response = {
      roomCode: code,
      quiz: room.quizzes,
      currentQuiz: currentQuiz.quiz,
      endTime: currentQuiz.endTime,
      currentQuestion: room.currentQuizIndex,
      totalQuestions: room.quizzes.length,
      quizDuration: room.quizDuration || 30,
    };

    console.log('Emitting quizStarted with:', response);
    this.server.to(`room_${code}`).emit('quizStarted', response);

    this.setRoomTimer(code, currentQuiz.endTime);
    return { success: true, totalQuestions: room.quizzes.length };
  }

  // Show Next Quiz
  @SubscribeMessage('nextQuestion')
  async handleNextQuestion(
    @MessageBody() { code }: { code: string },
  ): Promise<void> {
    try {
      const room = await this.roomService.findRoomByCode(code);
      if (!room) {
        throw new Error('Room not found');
      }

      const nextQuiz = await this.roomService.moveToNextQuiz(code);
      if (nextQuiz) {
        const response = {
          roomCode: code,
          quiz: nextQuiz.quiz,
          endTime: nextQuiz.endTime,
          currentQuestion: room.currentQuizIndex,
          totalQuestions: room.quizzes.length,
          quizDuration: room.quizDuration || 30,
        };

        console.log('Emitting next question:', response);

        // Emit two Function Next Quiz And Quiz Start
        this.server.to(`room_${code}`).emit('nextQuestion', response);
        this.server.to(`room_${code}`).emit('quizStarted', response);
        this.setRoomTimer(code, nextQuiz.endTime);
      } else {
        console.log('Quiz completed for room:', code);

        // Emit two function else quiz should end and room has finish
        this.server.to(`room_${code}`).emit('quizEnded', { roomCode: code });
        this.server.to(`room_${code}`).emit('roomFinished', { roomCode: code });
      }
    } catch (error) {
      console.error('Error moving to next question:', error);
    }
  }

  // Get All Quizzes List
  @SubscribeMessage('getQuizList')
  async handleGetQuizList(@ConnectedSocket() client: Socket) {
    try {
      const quizzes = await this.quizService.findAll();
      console.log('Sending quizList:', quizzes);
      client.emit('quizList', quizzes);
    } catch (err) {
      console.error('Failed to fetch quiz list', err);
      client.emit('quizList', []);
    }
  }

  // Submit Quiz Answer
  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(
    @MessageBody()
    {
      answer,
      clientId,
      quizId,
    }: { answer: string; clientId: string; quizId: number },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const quiz = await this.quizService.findOne(quizId);
    const result = quiz && answer === quiz.correctAnswer;

    // Get room code from client's rooms
    const roomCode = Array.from(client.rooms)
      .find((room) => room.startsWith('room_'))
      ?.replace('room_', '');

    if (roomCode) {
      await this.roomService.incrementUserAttempts(clientId, roomCode);
    }

    // Send result to the specific client
    client.emit('quizResult', {
      clientId,
      result,
      correctAnswer: quiz ? quiz.correctAnswer : null,
      attempts: roomCode
        ? await this.roomService.getUserAttempts(clientId, roomCode)
        : 0,
    });

    // If host wants to see all answers
    this.server.to(`host_${client.id}`).emit('answerSubmitted', {
      clientId,
      answer,
      isCorrect: result,
    });
  }

  private setRoomTimer(roomCode: string, endTime: Date) {
    const timeLeft = endTime.getTime() - Date.now();
    if (timeLeft <= 0) return;

    const timer = setTimeout(() => {
      (() => {
        this.roomService
          .moveToNextQuiz(roomCode)
          .then((nextQuiz) => {
            if (nextQuiz) {
              const response = {
                roomCode,
                quiz: nextQuiz.quiz,
                endTime: nextQuiz.endTime,
              };
              this.server.to(`room_${roomCode}`).emit('nextQuestion', response);
              this.server.to(`room_${roomCode}`).emit('quizStarted', response);
              this.setRoomTimer(roomCode, nextQuiz.endTime);
            } else {
              this.server
                .to(`room_${roomCode}`)
                .emit('quizEnded', { roomCode });
              this.server
                .to(`room_${roomCode}`)
                .emit('roomFinished', { roomCode });
              this.roomTimers.delete(roomCode);
            }
          })
          .catch((error) => {
            console.error(
              `Error moving to next quiz for room ${roomCode}:`,
              error,
            );
          });
      })();
    }, timeLeft);

    this.roomTimers.set(roomCode, timer);
  }

  private clearRoomTimer(roomCode: string) {
    const timer = this.roomTimers.get(roomCode);
    if (timer) {
      clearTimeout(timer);
      this.roomTimers.delete(roomCode);
    }
  }
}

import { defineStore } from "pinia";
import { ref } from "vue";
import {
  authenticateSocket,
  connectSockets,
  getSockets,
} from "../services/socket.js";

export const useQuizStore = defineStore("quiz", () => {
  const currentRoom = ref(null);
  const currentQuestion = ref(null);
  const leaderboard = ref([]);
  const participants = ref([]);
  const quizState = ref("lobby");
  const userAnswer = ref(null);
  const answerResult = ref(null);
  const timeLeft = ref(0);

  let roomSocket, quizSocket;

  const initSockets = () => {
    roomSocket.on("roomJoined", (data) => {
      currentRoom.value = data;
      participants.value = data.participants;
    });

    roomSocket.on("participantJoined", (participant) => {
      if (!participants.value.some((p) => p.id === participant.userId)) {
        participants.value.push(participant);
      }
    });

    roomSocket.on("participantLeft", (participant) => {
      participants.value = participants.value.filter(
        (p) => p.userId !== participant.userId
      );
    });

    roomSocket.on("quizStarted", () => {
      quizState.value = "question";
    });

    quizSocket.on("question", (question) => {
      currentQuestion.value = question;
      quizState.value = "question";
      userAnswer.value = null;
      answerResult.value = null;
      timeLeft.value = question.timeLimit;

      const timer = setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    });

    quizSocket.on("answerResult", (result) => {
      answerResult.value = result;
    });

    quizSocket.on("leaderboard", (scores) => {
      leaderboard.value = scores;
      quizState.value = "leaderboard";
    });

    quizSocket.on("quizEnded", (finalResults) => {
      leaderboard.value = finalResults;
      quizState.value = "completed";
    });
  };

  // Connect sockets and initialize listeners
  const connect = () => {
    connectSockets(); // ✅ Ensure sockets are initialized
    const sockets = getSockets();
    roomSocket = sockets.roomSocket;
    quizSocket = sockets.quizSocket;

    roomSocket.connect();
    quizSocket.connect();
    initSockets();
  };

  const joinRoom = (roomCode, userId, username) => {
    authenticateSocket(userId, username);
    roomSocket.emit("joinRoom", { roomCode });
  };

  const submitAnswer = (answer) => {
    if (!currentRoom.value || !currentQuestion.value) return;

    const responseTime =
      currentQuestion.value.timeLimit * 1000 - timeLeft.value * 1000;
    quizSocket.emit("submitAnswer", {
      roomCode: currentRoom.value.roomCode,
      questionId: currentQuestion.value.id,
      answer,
      responseTime,
    });
  };

  const reset = () => {
    currentRoom.value = null;
    currentQuestion.value = null;
    leaderboard.value = [];
    participants.value = [];
    quizState.value = "lobby";
    userAnswer.value = null;
    answerResult.value = null;
    timeLeft.value = 0;
  };

  return {
    currentRoom,
    currentQuestion,
    leaderboard,
    participants,
    quizState,
    userAnswer,
    answerResult,
    timeLeft,
    connect,
    joinRoom,
    submitAnswer,
    reset,
  };
});

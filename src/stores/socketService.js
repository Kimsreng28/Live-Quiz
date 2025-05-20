import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";
const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection management
const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// Connection status logging
socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err);
});

// Quiz list handlers
const getQuizList = () => {
  socket.emit("getQuizList");
};

const onQuizList = (callback) => {
  socket.off("quizList");
  socket.on("quizList", callback);
};

// Quiz answer submission
const submitAnswer = (data) => {
  socket.emit("submitAnswer", data);
};

// Quiz Result
const onQuizResult = (callback) => {
  socket.off("quizResult");
  socket.on("quizResult", callback);
};

// Room management
const createRoomWithQuizzes = (data) => {
  return new Promise((resolve) => {
    socket.emit("createRoomWithQuizzes", data, (response) => {
      resolve(response.code);
    });
  });
};

const joinRoom = (code, clientId) => {
  return new Promise((resolve, reject) => {
    socket.emit("joinRoom", { code, clientId }, (response) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response.error || "Failed to join room");
      }
    });
  });
};

const startQuiz = (code) => {
  return new Promise((resolve, reject) => {
    socket.emit("startQuiz", { code }, (response) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response.error);
      }
    });
  });
};

// Quiz progression listeners
const onQuizStarted = (callback) => {
  socket.off("quizStarted");
  socket.on("quizStarted", callback);
};

const onQuizEnded = (callback) => {
  socket.off("quizEnded");
  socket.on("quizEnded", callback);
};

const onRoomFinished = (callback) => {
  socket.off("roomFinished");
  socket.on("roomFinished", callback);
};

const onNextQuestion = (callback) => {
  socket.off("nextQuestion");
  socket.on("nextQuestion", callback);
};

export default {
  socket,
  connectSocket,
  disconnectSocket,
  getQuizList,
  onQuizList,
  submitAnswer,
  onQuizResult,
  createRoomWithQuizzes,
  joinRoom,
  startQuiz,
  onQuizStarted,
  onQuizEnded,
  onRoomFinished,
  onNextQuestion,
};

import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3100";

let roomSocket = null;
let quizSocket = null;

export const connectSockets = () => {
  roomSocket = io(`${SOCKET_URL}/room`, {
    withCredentials: true,
    autoConnect: false,
  });

  quizSocket = io(`${SOCKET_URL}/quiz`, {
    withCredentials: true,
    autoConnect: false,
  });

  return { roomSocket, quizSocket };
};

export const getSockets = () => {
  if (!roomSocket || !quizSocket) {
    throw new Error("Sockets not initialized. Call connectSockets first.");
  }
  return { roomSocket, quizSocket };
};

export const authenticateSocket = (userId, username) => {
  if (roomSocket && quizSocket) {
    roomSocket.emit("authenticate", { userId, username });
    quizSocket.emit("authenticate", { userId, username });
  }
};

export const disconnectSockets = () => {
  if (roomSocket) roomSocket.disconnect();
  if (quizSocket) quizSocket.disconnect();
};

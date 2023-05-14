import http from "http";
import { Server } from "socket.io";

export const setupWebSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  return io;
};

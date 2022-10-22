import cors from "cors";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { SOCKET_ACTION } from "./constants";
import { JoinChatRequest, MessageRequest } from "./types";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
});

io.on(SOCKET_ACTION.CONNECTION, (socket: Socket) => {
  console.log("Connected to the socket: %s", socket.id);

  socket.on(SOCKET_ACTION.JOIN_ROOM, ({ name, room }: JoinChatRequest) => {
    console.log("User %s joined %s", name, room);
    socket.join(room);
  });

  // to listen to second user joined
  socket.on(
    SOCKET_ACTION.SEND_USER_JOINED,
    ({ name, room }: JoinChatRequest) => {
      socket.to(room).emit(SOCKET_ACTION.RECEIVE_USER_JOINED, { name, room });
    }
  );

  // to send the first user's name to second user
  socket.on(
    SOCKET_ACTION.RECEIVE_USER_JOINED,
    ({ name, room }: JoinChatRequest) => {
      socket.to(room).emit(SOCKET_ACTION.SEND_USER_JOINED, { name, room });
    }
  );

  socket.on(SOCKET_ACTION.USER_TYPING, ({ name, room, isTyping }) => {
    socket.to(room).emit(SOCKET_ACTION.USER_TYPING, { name, room, isTyping });
  });

  socket.on(SOCKET_ACTION.SEND_MESSAGE, (message: MessageRequest) => {
    console.log(
      "Message '%s' sent by %s to %s room",
      message.text,
      message.author,
      message.room
    );
    socket.to(message.room).emit(SOCKET_ACTION.RECEIVE_MESSAGE, message);
  });

  socket.on(SOCKET_ACTION.DISCONNECT, () => {
    console.log("Disconnected from the socket: %s", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server started at: %s", PORT);
});

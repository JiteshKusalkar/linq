import cors from "cors";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log("Connected to the socket: %s", socket.id);

  socket.on("join", (user: string, room: string) => {
    console.log('User %s joined %s', user, room);
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the socket: %s", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server started at: %s", PORT);
});

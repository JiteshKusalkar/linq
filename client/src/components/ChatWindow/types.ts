import { Socket } from "socket.io-client";

export type ChatWindowProps = {
  name: string;
  room: string;
  socket: Socket;
};

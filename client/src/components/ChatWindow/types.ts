import { Socket } from "socket.io-client";
import { Message } from "../DisplayMessage/types";

export type ChatWindowProps = {
  socket: Socket;
};

export type UserTypingProps = {
  name: string;
  room: string;
  isTyping: boolean;
}

export type JoinChatResponse = {
  id: string;
  name: string;
  room: string;
}

export type MessageTransferSuccessHandler = (message: Message) => void;
export type ReceiveUserJoinedSuccessHandler = (message: JoinChatResponse) => void;
export type SendUserJoinedSuccessHandler = (message: JoinChatResponse) => void;
export type UserTypingSuccessHandler = (message: UserTypingProps) => void;

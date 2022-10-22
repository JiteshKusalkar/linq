import { Socket } from "socket.io-client";
import { Message } from "../DisplayMessage/types";
import { JoinChatFormData } from "../JoinChatForm/types";

export type ChatWindowProps = {
  socket: Socket;
};

export type UserTypingProps = {
  name: string;
  room: string;
  isTyping: boolean;
}

export type MessageTransferSuccessHandler = (message: Message) => void;
export type ReceiveUserJoinedSuccessHandler = (message: JoinChatFormData) => void;
export type SendUserJoinedSuccessHandler = (message: JoinChatFormData) => void;
export type UserTypingSuccessHandler = (message: UserTypingProps) => void;

import { Socket } from "socket.io-client";
import { Message } from "../DisplayMessage/types";
import { JoinChatFormData } from "../JoinChatForm/types";

export type ChatWindowProps = {
  socket: Socket;
};

export type MessageTransferSuccessHandler = (message: Message) => void;
export type ReceiveUserJoinedSuccessHandler = (message: JoinChatFormData) => void;
export type SendUserJoinedSuccessHandler = (message: JoinChatFormData) => void;

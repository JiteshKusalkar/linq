export type JoinChatRequest = {
  name: string;
  room: string;
}

export enum MessageType {
  REGULAR = "regular",
  FADED = "faded",
  HIGHLIGHT = "highlight",
  THINK = "think",
}

export type MessageRequest = {
  text: string;
  author: string;
  createdAt: number;
  room: string;
  type: MessageType;
}

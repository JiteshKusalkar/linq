export type JoinChatRequest = {
  id: string;
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
  id: string;
  text: string;
  author: string;
  authorId: string;
  createdAt: number;
  room: string;
  roomId: string;
  type: MessageType;
}

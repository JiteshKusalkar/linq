export enum MessageType {
  REGULAR = "regular",
  FADED = "faded",
  HIGHLIGHT = "highlight",
  THINK = "think",
  NICK = "nick",
  OOPS = "oops",
  COUNTDOWN = "countdown",
}

export enum MessageOwner {
  OWN = "own",
  OTHER = "other",
}

export type Message = {
  text: string;
  author: string;
  createdAt: number;
  room: string;
  type: MessageType;
  meta?: Record<string, string | number>;
};

export type DisplayMessageProps = {
  message: Message;
  own: boolean;
};

export type MessageLookup = Record<MessageOwner, Record<MessageType, string>>;

export enum MessageType {
  REGULAR = "regular",
  FADED = "faded",
  HIGHLIGHT = "highlight",
  THINK = "think",
  NICK = "nick",
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
};

export type DisplayMessageProps = {
  message: Message;
  own: boolean;
};

export type MessageLookup = Record<MessageOwner, Record<MessageType, string>>;

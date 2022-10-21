export type Message = {
  text: string;
  author: string;
  createdAt: number;
  room: string;
}

export type DisplayMessageProps = {
  message: Message
}
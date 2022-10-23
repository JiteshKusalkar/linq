import { Message } from "../DisplayMessage/types";

export type CountdownMessageProps = {
  message: Message;
  own: boolean;
};

export type CountdownProps = {
  timer: number;
  callbackAfterCountdown: () => void;
};

import { ChangeEvent } from "react";

export type MessageFormData = {
  message: string;
}

export type EditorProps = {
  onMessageSend: (text: MessageFormData) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

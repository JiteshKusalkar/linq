export type MessageFormData = {
  message: string;
}

export type EditorProps = {
  onMessageSend: (text: MessageFormData) => void;
};

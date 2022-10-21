export type JoinChatFormProps = {
  onJoinChat?: (name: string, room: string) => void;
};

export type JoinChatFormData = {
  name: string;
  room: string;
};

import { Dispatch, ReactNode, SetStateAction } from "react";

export type ChatState = {
  name: string;
  room: string;
};

export type SetChatState = Dispatch<SetStateAction<ChatState>>;

export type ChatContext = [ChatState, SetChatState];

export type ChatContextHookState = {
  chatState: ChatState;
  setChatState: SetChatState;
};

export type ChatStateProviderProps = {
  /**
   * Children sharing the chat state
   */
  children: ReactNode;
};

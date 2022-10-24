import { Dispatch, ReactNode, SetStateAction } from "react";
import { Message } from "../../components/DisplayMessage/types";

export type ChatState = {
  name: string;
  id: string;
  room: string;
  roomId: string;
  joinedUsername: string;
  joinedUserId: string;
  messages: Message[];
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

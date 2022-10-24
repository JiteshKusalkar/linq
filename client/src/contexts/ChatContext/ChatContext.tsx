import React, { createContext, useState } from "react";

import { ChatContext, ChatStateProviderProps, ChatState } from "./types";

const initialChatState = {
  name: "",
  id: "",
  room: "",
  roomId: "",
  joinedUsername: "",
  joinedUserId: "",
  messages: [],
};

const ChatStateContext = createContext<ChatContext>([
  initialChatState,
  () => null,
]);

function ChatStateProvider({ children }: ChatStateProviderProps) {
  const [state, setState] = useState<ChatState>(initialChatState);

  return (
    <ChatStateContext.Provider value={[state, setState]}>
      {children}
    </ChatStateContext.Provider>
  );
}

export { ChatStateProvider, ChatStateContext };

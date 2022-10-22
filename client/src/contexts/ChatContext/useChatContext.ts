import { useContext } from "react";

import { ChatStateContext } from "./ChatContext";
import { ChatContext, ChatContextHookState } from "./types";

function useChatState(): ChatContextHookState {
  const [chatState, setChatState] = useContext<ChatContext>(ChatStateContext);

  return {
    chatState,
    setChatState,
  };
}

export default useChatState;

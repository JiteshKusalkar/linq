import { useCallback } from "react";
import { useChatContext } from "../../contexts/ChatContext";
import { Message, MessageType } from "../DisplayMessage/types";

function useMessageFunctions() {
  const { setChatState } = useChatContext();

  const operateByMessageType = useCallback(
    (message: Message) => {
      switch (message.type) {
        case MessageType.NICK:
          setChatState((prevState) => ({
            ...prevState,
            joinedUsername: message.author,
          }));

          break;

        default:
          break;
      }
    },
    [setChatState]
  );

  return operateByMessageType;
}

export default useMessageFunctions;

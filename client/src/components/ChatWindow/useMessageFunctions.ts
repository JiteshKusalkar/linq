import { useCallback } from "react";
import { useChatContext } from "../../contexts/ChatContext";
import { Message, MessageType } from "../DisplayMessage/types";

function useMessageFunctions() {
  const {
    chatState: { name, joinedUsername },
    setChatState,
  } = useChatContext();

  const operateByMessageType = useCallback(
    (message: Message, hasReceived = false) => {
      switch (message.type) {
        case MessageType.NICK:
          setChatState((prevState) => ({
            ...prevState,
            joinedUsername: message.author,
          }));

          break;

        case MessageType.OOPS:
          let ignore = false;

          setChatState((prevState) => ({
            ...prevState,
            messages: prevState.messages.reduceRight(
              (acc: Message[], message) => {
                if (
                  !ignore &&
                  message.author === (hasReceived ? joinedUsername : name)
                ) {
                  ignore = true;
                  return acc;
                }
                return [message, ...acc];
              },
              []
            ),
          }));

          break;

        default:
          break;
      }
    },
    [joinedUsername, name, setChatState]
  );

  return operateByMessageType;
}

export default useMessageFunctions;

import { useCallback } from "react";
import { useChatContext } from "../../contexts/ChatContext";
import { Message, MessageType } from "../DisplayMessage/types";

function useMessageFunctions() {
  const {
    chatState: { id, joinedUserId, joinedUsername },
    setChatState,
  } = useChatContext();

  const operateByMessageType = useCallback(
    (message: Message, hasReceived = false) => {
      switch (message.type) {
        case MessageType.NICK:
          setChatState((prevState) => ({
            ...prevState,
            joinedUsername: hasReceived ? message.author : joinedUsername,
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
                  message.authorId === (hasReceived ? joinedUserId : id)
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
    [id, joinedUserId, joinedUsername, setChatState]
  );

  return operateByMessageType;
}

export default useMessageFunctions;

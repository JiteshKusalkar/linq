import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { SOCKET_ACTION } from "../../utils/socketActions";
import { Message } from "../DisplayMessage/types";
import { MessageTransferSuccessHandler } from "./types";

function useMessageTransfer(socket: Socket, onSuccess?: MessageTransferSuccessHandler) {
  useEffect(() => {
    // source: https://github.com/facebook/react/issues/24502#issuecomment-1118867879
    let ignore = false;
    socket.on(SOCKET_ACTION.RECEIVE_MESSAGE, (receivedMessage: Message) => {
      if (!ignore) {
        onSuccess?.(receivedMessage);
      }
    });

    return () => {
      ignore = true;
    };
  }, [socket, onSuccess]);
}

export default useMessageTransfer;

import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { SOCKET_ACTION } from "../../utils/socketActions";
import { UserTypingProps, UserTypingSuccessHandler } from "./types";

function useUserTyping(socket: Socket, onSuccess: UserTypingSuccessHandler) {
  useEffect(() => {
    // source: https://github.com/facebook/react/issues/24502#issuecomment-1118867879
    let ignore = false;

    socket.on(
      SOCKET_ACTION.USER_TYPING,
      ({ name, room, isTyping }: UserTypingProps) => {
        if (!ignore) {
          onSuccess?.({ name, room, isTyping });
        }
      }
    );

    return () => {
      ignore = true;
    };
  }, [socket, onSuccess]);
}

export default useUserTyping;

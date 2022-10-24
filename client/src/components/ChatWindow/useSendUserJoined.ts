import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { SOCKET_ACTION } from "../../utils/socketActions";
import { JoinChatResponse, SendUserJoinedSuccessHandler } from "./types";

function useSendUserJoined(
  socket: Socket,
  onSuccess?: SendUserJoinedSuccessHandler
) {
  useEffect(() => {
    // source: https://github.com/facebook/react/issues/24502#issuecomment-1118867879
    let ignore = false;

    socket.on(
      SOCKET_ACTION.SEND_USER_JOINED,
      ({ name, id, room }: JoinChatResponse) => {
        if (!ignore) {
          onSuccess?.({ name, id, room });
        }
      }
    );

    return () => {
      ignore = true;
    };
  }, [socket, onSuccess]);
}

export default useSendUserJoined;

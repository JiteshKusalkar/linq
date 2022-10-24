import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { SOCKET_ACTION } from "../../utils/socketActions";
import { JoinChatResponse, ReceiveUserJoinedSuccessHandler } from "./types";

function useReceiveUserJoined(
  socket: Socket,
  onSuccess?: ReceiveUserJoinedSuccessHandler
) {
  useEffect(() => {
    // source: https://github.com/facebook/react/issues/24502#issuecomment-1118867879
    let ignore = false;

    socket.on(
      SOCKET_ACTION.RECEIVE_USER_JOINED,
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

export default useReceiveUserJoined;

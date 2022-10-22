import { useMemo, useState } from "react";
import { connect } from "socket.io-client";
import ChatWindow from "../../components/ChatWindow";
import JoinChatForm from "../../components/JoinChatForm";
import { useChatContext } from "../../contexts/ChatContext";
import { SOCKET_ACTION } from "../../utils/socketActions";

const url = process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3001";
const socket = connect(url);

function Chat() {
  const [hasJoinedChat, setHasJoinedChat] = useState(false);
  const { setChatState } = useChatContext();

  const memoisedSocket = useMemo(() => socket, []);

  const handleJoinChat = (name: string, room: string) => {
    setChatState((prevState) => ({ ...prevState, name, room }));

    // join room
    socket.emit(SOCKET_ACTION.JOIN_ROOM, { name, room });
    // let other user know you have joined
    socket.emit(SOCKET_ACTION.SEND_USER_JOINED, { name, room });

    setHasJoinedChat(true);
  };

  return hasJoinedChat ? (
    <ChatWindow socket={memoisedSocket} />
  ) : (
    <JoinChatForm onJoinChat={handleJoinChat} />
  );
}

export default Chat;

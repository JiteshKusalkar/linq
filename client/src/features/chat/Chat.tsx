import { useState } from "react";
import { connect } from "socket.io-client";
import ChatWindow from "../../components/ChatWindow";
import JoinChatForm from "../../components/JoinChatForm";
import { useChatContext } from "../../contexts/ChatContext";
import generateID from "../../utils/generateID";
import { SOCKET_ACTION } from "../../utils/socketActions";

const url = process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3001";
const socket = connect(url);

function Chat() {
  const [hasJoinedChat, setHasJoinedChat] = useState(false);
  const { setChatState } = useChatContext();

  const handleJoinChat = (name: string, room: string) => {
    const id = generateID();

    setChatState((prevState) => ({
      ...prevState,
      name,
      id,
      room,
    }));

    // join room
    socket.emit(SOCKET_ACTION.JOIN_ROOM, { name, id, room });
    // let other user know you have joined
    socket.emit(SOCKET_ACTION.SEND_USER_JOINED, { name, id, room });

    setHasJoinedChat(true);
  };

  return hasJoinedChat ? (
    <ChatWindow socket={socket} />
  ) : (
    <JoinChatForm onJoinChat={handleJoinChat} />
  );
}

export default Chat;

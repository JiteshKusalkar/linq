import { useState } from "react";
import { connect } from "socket.io-client";
import ChatWindow from "../../components/ChatWindow";
import JoinChatForm from "../../components/JoinChatForm";
import { SOCKET_ACTION } from "../../utils/socketActions";

const url = process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3001";
const socket = connect(url);

function Chat() {
  const [hasJoinedChat, setHasJoinedChat] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleJoinChat = (name: string, room: string) => {
    setName(name);
    setRoom(room);

    socket.emit(SOCKET_ACTION.JOIN_ROOM, { name, room });
    setHasJoinedChat(true);
  };

  return hasJoinedChat ? (
    <ChatWindow name={name} room={room} socket={socket} />
  ) : (
    <JoinChatForm onJoinChat={handleJoinChat} />
  );
}

export default Chat;

import { useState } from "react";
import { connect } from "socket.io-client";
import Chat from "./components/Chat";
import JoinChatForm from "./components/JoinChatForm";
import { GlobalStyles, Main, WelcomeHeading } from "./global.styles";
import { SOCKET_ACTION } from "./utils/socketActions";

const url = process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3001";
const socket = connect(url);

function App() {
  const [hasJoinedChat, setHasJoinedChat] = useState(false);

  const handleJoinChat = (name: string, room: string) => {
    socket.emit(SOCKET_ACTION.JOIN_ROOM, { name, room });
    setHasJoinedChat(true);
  };

  return (
    <Main>
      <GlobalStyles />
      <WelcomeHeading>Welcome to LinQ!</WelcomeHeading>
      {hasJoinedChat ? <Chat /> : <JoinChatForm onJoinChat={handleJoinChat} />}
    </Main>
  );
}

export default App;

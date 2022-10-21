import { connect } from "socket.io-client";
import JoinChatForm from "./components/JoinChatForm";
import { GlobalStyles, Main, WelcomeHeading } from "./global.styles";

const url = process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3001";
const socket = connect(url);

function App() {
  return (
    <Main>
      <GlobalStyles />
      <WelcomeHeading>Welcome to LinQ!</WelcomeHeading>
      <JoinChatForm socket={socket} />
    </Main>
  );
}

export default App;

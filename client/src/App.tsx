import { connect } from "socket.io-client";
import JoinChatForm from "./components/JoinChatForm";

const url = process.env.REACT_APP_SOCKET_SERVER || "http://localhost:3001";
connect(url);

function App() {
  return (
    <main>
      <JoinChatForm />
    </main>
  );
}

export default App;

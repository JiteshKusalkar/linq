import { ChatStateProvider } from "./contexts/ChatContext";
import Chat from "./features/chat";
import { GlobalStyles, Main, MainHeading } from "./global.styles";

function App() {
  return (
    <Main>
      <GlobalStyles />
      <MainHeading>Welcome to LinQ!</MainHeading>
      <ChatStateProvider>
        <Chat />
      </ChatStateProvider>
    </Main>
  );
}

export default App;

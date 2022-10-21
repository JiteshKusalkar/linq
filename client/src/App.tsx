import Chat from "./features/chat";
import { GlobalStyles, Main, MainHeading } from "./global.styles";

function App() {
  return (
    <Main>
      <GlobalStyles />
      <MainHeading>Welcome to LinQ!</MainHeading>
      <Chat />
    </Main>
  );
}

export default App;

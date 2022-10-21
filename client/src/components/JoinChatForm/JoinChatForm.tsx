import { Button, Form, Heading } from "../../global.styles";
import Input from "../Input";
import { Wrapper } from "./styles";
import { JoinChatFormProps } from "./types";

function JoinChatForm({ socket }: JoinChatFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    socket.emit("join", "Escanor", "water 7");
  };

  return (
    <Wrapper>
      <Heading.H2>Join a chat</Heading.H2>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Enter name"
          placeholder="Enter name"
          id="name"
          name="name"
        />
        <Input
          label="Enter Room ID"
          placeholder="Enter Room ID"
          id="room"
          name="room"
        />

        <Button type="submit">Join Chat</Button>
      </Form>
    </Wrapper>
  );
}

export default JoinChatForm;

import { Button, Form, Input, Typography } from "../../global.styles";
import { Wrapper } from "./styles";

function JoinChatForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Typography as="h1">Join a chat</Typography>
      <Form onSubmit={handleSubmit}>
        <Typography id="name" as="label">
          Enter name
        </Typography>
        <Input type="text" id="name" name="name" placeholder="Enter name" />

        <Typography id="room" as="label">
          Enter Room ID
        </Typography>
        <Input type="text" id="room" name="room" placeholder="Enter Room ID" />

        <Button type="submit">Join Chat</Button>
      </Form>
    </Wrapper>
  );
}

export default JoinChatForm;

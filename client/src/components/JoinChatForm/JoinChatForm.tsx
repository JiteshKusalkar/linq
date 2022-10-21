import { Button, Form, Heading } from "../../global.styles";
import Input from "../Input";
import { Wrapper } from "./styles";
import { JoinChatFormData, JoinChatFormProps } from "./types";
import useJoinChatForm from "./useJoinChatForm";

function JoinChatForm({ onJoinChat }: JoinChatFormProps) {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useJoinChatForm();

  const onSubmit = (data: JoinChatFormData) => {
    const { name, room } = data;
    onJoinChat?.(name.trim(), room.trim());
    reset();
  };

  return (
    <Wrapper>
      <Heading.H2>Join a chat</Heading.H2>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          id="name"
          label="Enter name"
          placeholder="Enter name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="room"
          label="Enter Room ID"
          placeholder="Enter Room ID"
          error={errors.room?.message}
          {...register("room")}
        />

        <Button type="submit">Join Chat</Button>
      </Form>
    </Wrapper>
  );
}

export default JoinChatForm;

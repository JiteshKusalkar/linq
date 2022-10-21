import { Button } from "../../global.styles";
import { MessageForm, StyledInputEditor, Wrapper } from "./styles";
import { EditorProps, MessageFormData } from "./types";
import useMessageForm from "./useMessageForm";

function Editor({ onMessageSend }: EditorProps) {
  const { register, reset, handleSubmit } = useMessageForm();

  const onSubmit = (data: MessageFormData) => {
    onMessageSend?.(data);
    reset();
  };

  return (
    <Wrapper>
      <MessageForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputEditor
          type="text"
          id="message"
          placeholder="Type a message..."
          {...register("message")}
        />
        <Button type="submit">Send</Button>
      </MessageForm>
    </Wrapper>
  );
}

export default Editor;

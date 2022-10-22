import { ChangeEvent } from "react";
import { Button } from "../../global.styles";
import { MessageForm, StyledInputEditor, Wrapper } from "./styles";
import { EditorProps, MessageFormData } from "./types";
import useMessageForm from "./useMessageForm";

function Editor({ onChange, onMessageSend }: EditorProps) {
  const { register, reset, handleSubmit, setValue } = useMessageForm();

  const onSubmit = (data: MessageFormData) => {
    onMessageSend?.(data);
    reset();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue("message", event.target.value);
    onChange?.(event);
  };

  return (
    <Wrapper>
      <MessageForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputEditor
          type="text"
          id="message"
          placeholder="Type a message..."
          {...register("message")}
          onChange={handleChange}
        />
        <Button type="submit">Send</Button>
      </MessageForm>
    </Wrapper>
  );
}

export default Editor;

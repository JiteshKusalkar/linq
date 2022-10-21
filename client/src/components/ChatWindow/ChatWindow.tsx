import { memo, useEffect, useState } from "react";
import Editor from "../Editor";
import DisplayMessage from "../DisplayMessage";
import { SOCKET_ACTION } from "../../utils/socketActions";
import { MessageFormData } from "../Editor/types";
import { Message, MessageType } from "../DisplayMessage/types";
import { ChatWindowProps } from "./types";
import { ChatBody, ChatFooter, ChatHeader, Wrapper } from "./styles";

function ChatWindow({ name, room, socket }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChange = async ({ message }: MessageFormData) => {
    const newMessage: Message = {
      author: name,
      createdAt: Date.now(),
      room,
      text: message,
      type: MessageType.REGULAR,
    };

    await socket.emit(SOCKET_ACTION.SEND_MESSAGE, newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    // source: https://github.com/facebook/react/issues/24502#issuecomment-1118867879
    let ignore = false;
    socket.on(SOCKET_ACTION.RECEIVE_MESSAGE, (receivedMessage: Message) => {
      if (!ignore) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    });

    return () => {
      ignore = true;
    };
  }, [socket]);

  return (
    <Wrapper>
      <ChatHeader>{name}</ChatHeader>
      <ChatBody>
        {messages.map((message) => (
          <DisplayMessage
            message={message}
            own={message.author === name}
            key={message.createdAt}
          />
        ))}
      </ChatBody>
      <ChatFooter>
        <Editor onMessageSend={handleChange} />
      </ChatFooter>
    </Wrapper>
  );
}

export default memo(ChatWindow);

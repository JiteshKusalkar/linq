import { useState } from "react";
import Editor from "../Editor";
import { MessageFormData } from "../Editor/types";
import DisplayMessage from "../DisplayMessage";
import { Message, MessageType } from "../DisplayMessage/types";
import { ChatWindowProps } from "./types";
import { ChatBody, ChatFooter, ChatHeader, Wrapper } from "./styles";

function ChatWindow({ name, room, socket }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChange = ({ message }: MessageFormData) => {
    const newMessage: Message = {
      author: name,
      createdAt: Date.now(),
      room,
      text: message,
      type: MessageType.REGULAR,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

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

export default ChatWindow;

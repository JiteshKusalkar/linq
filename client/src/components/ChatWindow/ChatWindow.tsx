import { memo, useCallback, useState } from "react";
import Editor from "../Editor";
import DisplayMessage from "../DisplayMessage";
import { SOCKET_ACTION } from "../../utils/socketActions";
import { MessageFormData } from "../Editor/types";
import { Message, MessageType } from "../DisplayMessage/types";
import { JoinChatFormData } from "../JoinChatForm/types";
import { ChatWindowProps } from "./types";
import { ChatBody, ChatFooter, ChatHeader, Wrapper } from "./styles";
import useMessageTransfer from "./useMessageTransfer";
import useReceiveUserJoined from "./useReceiveUserJoined";
import useSendUserJoined from "./useSendUserJoined";
import { useChatContext } from "../../contexts/ChatContext";

function ChatWindow({ socket }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [joinedUser, setJoinedUser] = useState("");
  const { chatState: { name, room } } = useChatContext();

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

  const onMessageReceiveSuccess = useCallback((receivedMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  }, []);

  const onReceiveUserJoinedSuccess = useCallback(
    ({ name: joinedUserName, room }: JoinChatFormData) => {
      if (joinedUserName !== name) {
        setJoinedUser(joinedUserName);
        socket.emit(SOCKET_ACTION.RECEIVE_USER_JOINED, { name, room });
      }
    },
    [name, socket]
  );

  const onSendUserJoinedSuccess = useCallback(
    ({ name: joinedUserName }: JoinChatFormData) => {
      if (joinedUserName !== name) {
        setJoinedUser(joinedUserName);
      }
    },
    [name]
  );

  useMessageTransfer(socket, onMessageReceiveSuccess);
  useReceiveUserJoined(socket, onReceiveUserJoinedSuccess);
  useSendUserJoined(socket, onSendUserJoinedSuccess);

  return (
    <Wrapper>
      <ChatHeader>{joinedUser || "No user joined"}</ChatHeader>
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

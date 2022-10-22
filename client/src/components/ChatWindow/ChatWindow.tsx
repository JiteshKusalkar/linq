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
import messageInterpreter from "../../utils/messageInterpreter";
import useMessageFunctions from "./useMessageFunctions";

function ChatWindow({ socket }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    chatState: { name, room, joinedUsername },
    setChatState,
  } = useChatContext();
  const operateByMessageType = useMessageFunctions();

  const handleChange = async ({ message }: MessageFormData) => {
    const newMessage: Message = {
      author: name,
      createdAt: Date.now(),
      room,
      text: message,
      type: MessageType.REGULAR,
    };

    await socket.emit(SOCKET_ACTION.SEND_MESSAGE, newMessage);

    // set text to empty text for special message types
    const transformedMessage = messageInterpreter(newMessage);

    // allow only when a non empty text is available
    if (transformedMessage.text) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const onMessageReceiveSuccess = useCallback(
    (receivedMessage: Message) => {
      const newMessage = messageInterpreter(receivedMessage);
      operateByMessageType(newMessage);

      if (newMessage.text) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    },
    [operateByMessageType]
  );

  const onReceiveUserJoinedSuccess = useCallback(
    ({ name: joinedUsername, room }: JoinChatFormData) => {
      if (joinedUsername !== name) {
        setChatState((prevState) => ({ ...prevState, joinedUsername }));
        socket.emit(SOCKET_ACTION.RECEIVE_USER_JOINED, { name, room });
      }
    },
    [name, socket, setChatState]
  );

  const onSendUserJoinedSuccess = useCallback(
    ({ name: joinedUsername }: JoinChatFormData) => {
      if (joinedUsername !== name) {
        setChatState((prevState) => ({ ...prevState, joinedUsername }));
      }
    },
    [name, setChatState]
  );

  useMessageTransfer(socket, onMessageReceiveSuccess);
  useReceiveUserJoined(socket, onReceiveUserJoinedSuccess);
  useSendUserJoined(socket, onSendUserJoinedSuccess);

  return (
    <Wrapper>
      <ChatHeader>{joinedUsername || "No user joined"}</ChatHeader>
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

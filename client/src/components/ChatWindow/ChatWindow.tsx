import { memo, useCallback, useState } from "react";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import Editor from "../Editor";
import DisplayMessage from "../DisplayMessage";
import { SOCKET_ACTION } from "../../utils/socketActions";
import { MessageFormData } from "../Editor/types";
import { Message } from "../DisplayMessage/types";
import { JoinChatFormData } from "../JoinChatForm/types";
import { ChatWindowProps, UserTypingProps } from "./types";
import { ChatBody, ChatFooter, ChatHeader, UserTypingTextStyled, Wrapper } from "./styles";
import useMessageTransfer from "./useMessageTransfer";
import useReceiveUserJoined from "./useReceiveUserJoined";
import useSendUserJoined from "./useSendUserJoined";
import { useChatContext } from "../../contexts/ChatContext";
import {
  getMessageType,
  messageInterpreter,
} from "../../utils/messageFunctions";
import useMessageFunctions from "./useMessageFunctions";
import useUserTyping from "./useUserTyping";

function ChatWindow({ socket }: ChatWindowProps) {
  const {
    chatState: { name, room, joinedUsername, messages },
    setChatState,
  } = useChatContext();
  const [isTyping, setIsTyping] = useState(false);
  const operateByMessageType = useMessageFunctions();

  const emitStoppedTyping = debounce(() => {
    socket.emit(SOCKET_ACTION.USER_TYPING, { name, room, isTyping: false });
  }, 450);
  const emitStartTyping = throttle(() => {
    socket.emit(SOCKET_ACTION.USER_TYPING, { name, room, isTyping: true });
  }, 450);

  const handleSend = async ({ message }: MessageFormData) => {
    const newMessage: Message = {
      author: name,
      createdAt: Date.now(),
      room,
      text: message,
      type: getMessageType(message),
    };

    socket.emit(SOCKET_ACTION.SEND_MESSAGE, newMessage);

    // set text to empty text for special message types
    const transformedMessage = messageInterpreter(newMessage);
    operateByMessageType(transformedMessage);

    // allow only when a non empty text is available
    if (transformedMessage.text) {
      setChatState((prevMessages) => ({
        ...prevMessages,
        messages: [...prevMessages.messages, transformedMessage],
      }));
    }
  };

  const handleChange = () => {
    emitStartTyping();
    emitStoppedTyping();
  };

  const onMessageReceiveSuccess = useCallback(
    (receivedMessage: Message) => {
      const newMessage = messageInterpreter(receivedMessage);
      operateByMessageType(newMessage, true);

      if (newMessage.text) {
        setChatState((prevMessages) => ({
          ...prevMessages,
          messages: [...prevMessages.messages, newMessage],
        }));
      }
    },
    [operateByMessageType, setChatState]
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

  const onUserTypingSuccessHandler = useCallback(
    ({ isTyping }: UserTypingProps) => {
      setIsTyping(isTyping);
    },
    []
  );

  useMessageTransfer(socket, onMessageReceiveSuccess);
  useReceiveUserJoined(socket, onReceiveUserJoinedSuccess);
  useSendUserJoined(socket, onSendUserJoinedSuccess);
  useUserTyping(socket, onUserTypingSuccessHandler);

  return (
    <Wrapper>
      <ChatHeader>
        {joinedUsername
          ? `You are talking to ${joinedUsername}`
          : "No user joined"}
      </ChatHeader>
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
        {isTyping && <UserTypingTextStyled>Typing...</UserTypingTextStyled>}
        <Editor onMessageSend={handleSend} onChange={handleChange} />
      </ChatFooter>
    </Wrapper>
  );
}

export default memo(ChatWindow);

import { Message, MessageType } from "../components/DisplayMessage/types";

function hasNick(messageText: string) {
  return messageText.match("/nick")?.index === 0;
}

function buildMessageExtractor(command: string) {
  function extractMessage(messageText: string) {
    return messageText.replace(command, "").trim();
  }

  return extractMessage;
}

const messageInterpreter = (message: Message): Message => {
  if (hasNick(message.text)) {
    const extractAuthor = buildMessageExtractor("/nick");

    return {
      ...message,
      author: extractAuthor(message.text),
      text: "",
      type: MessageType.NICK,
    };
  }

  return message;
};

export default messageInterpreter;

import { Message, MessageType } from "../components/DisplayMessage/types";

function hasNick(messageText: string) {
  return messageText.match("/nick")?.index === 0;
}

function hasThink(messageText: string) {
  return messageText.match("/think")?.index === 0;
}

function hasOops(messageText: string) {
  return messageText.match("/oops")?.index === 0;
}

function hasCountdown(messageText: string) {
  return messageText.match("/countdown")?.index === 0;
}

function isURL(text: string): boolean {
  const urlRegex = new RegExp(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
  );

  return Boolean(text.match(urlRegex));
}

function buildMessageExtractor(command: string) {
  function extractMessage(messageText: string) {
    return messageText.replace(command, "").trim();
  }

  function extractCountdownMeta(messageText: string) {
    const message = extractMessage(messageText);
    const [timer, url] = message.split(" ").filter(Boolean);

    return !isNaN(Number(timer)) && isURL(url)
      ? { timer: Number(timer), url }
      : undefined;
  }

  return { extractMessage, extractCountdownMeta };
}

export const messageInterpreter = (message: Message): Message => {
  if (hasNick(message.text)) {
    const { extractMessage: extractAuthor } = buildMessageExtractor("/nick");

    return {
      ...message,
      author: extractAuthor(message.text),
      text: "",
      type: MessageType.NICK,
    };
  }

  if (hasThink(message.text)) {
    const { extractMessage } = buildMessageExtractor("/think");

    return {
      ...message,
      text: extractMessage(message.text),
      type: MessageType.THINK,
    };
  }

  if (hasOops(message.text)) {
    const { extractMessage } = buildMessageExtractor("/oops");

    return {
      ...message,
      text: extractMessage(message.text),
      type: MessageType.OOPS,
    };
  }

  if (hasCountdown(message.text)) {
    const { extractCountdownMeta } = buildMessageExtractor("/countdown");

    return {
      ...message,
      meta: extractCountdownMeta(message.text),
    };
  }

  return message;
};

export const getMessageType = (message: string): MessageType => {
  if (hasOops(message)) {
    return MessageType.OOPS;
  }

  if (hasCountdown(message)) {
    return MessageType.COUNTDOWN;
  }

  return MessageType.REGULAR;
};

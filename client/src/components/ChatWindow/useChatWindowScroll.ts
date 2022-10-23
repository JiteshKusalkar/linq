import { useEffect, useRef } from "react";
import { Message } from "../DisplayMessage/types";

function useChatWindowScroll(messages: Message[]) {
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBodyRef.current && messages.length) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  return chatBodyRef;
}

export default useChatWindowScroll;

import format from "date-fns/format";
import { memo } from "react";
import CountdownMessage from "../CountdownMessage";
import {
  buildBgColorLookupByOwner,
  buildColorLookupByOwner,
} from "./messageLookup";
import { MessageText, TimeStamp, Wrapper } from "./styles";
import { DisplayMessageProps, MessageOwner, MessageType } from "./types";

function DisplayMessage({ message, own }: DisplayMessageProps) {
  const getColorByType = buildColorLookupByOwner(
    own ? MessageOwner.OWN : MessageOwner.OTHER
  );
  const getBgColorByType = buildBgColorLookupByOwner(
    own ? MessageOwner.OWN : MessageOwner.OTHER
  );

  return (
    <Wrapper
      style={{
        color: getColorByType(message.type),
        backgroundColor: getBgColorByType(message.type),
        alignSelf: own ? "flex-end" : "flex-start",
        textAlign: own ? "right" : "left",
        animation: own
          ? "slideInFromRight 0.3s ease-in-out"
          : "slideInFromLeft 0.3s ease-in-out",
      }}
    >
      {message.type === MessageType.COUNTDOWN && message.meta ? (
        <CountdownMessage message={message} own={own} />
      ) : (
        <MessageText>{message.text}</MessageText>
      )}
      <TimeStamp>
        {format(new Date(message.createdAt), "dd LLL yyyy hh:ss a")}
      </TimeStamp>
    </Wrapper>
  );
}

export default memo(DisplayMessage);

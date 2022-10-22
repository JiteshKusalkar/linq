import format from "date-fns/format";
import { memo } from "react";
import {
  buildBgColorLookupByOwner,
  buildColorLookupByOwner,
} from "./messageLookup";
import { MessageText, TimeStamp, Wrapper } from "./styles";
import { DisplayMessageProps, MessageOwner } from "./types";

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
      }}
    >
      <MessageText>{message.text}</MessageText>
      <TimeStamp>
        {format(new Date(message.createdAt), "dd/mmm/yyyy hh:ss a")}
      </TimeStamp>
    </Wrapper>
  );
}

export default memo(DisplayMessage);

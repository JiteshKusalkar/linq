import { useCallback } from "react";
import Countdown from "./Countdown";
import { MessageText, Wrapper } from "./styles";
import { CountdownMessageProps } from "./types";

function CountdownMessage({ message, own }: CountdownMessageProps) {
  const handleCountdownComplete = useCallback(() => {
    if (message.meta) {
      window.open(String(message.meta.url), "_blank");
    }
  }, [message.meta]);

  if (own) {
    return <MessageText>Countdown set!</MessageText>;
  }

  return (
    <Wrapper>
      <MessageText>
        You will be redirected to {message.meta?.url} in:
      </MessageText>
      {message.meta && (
        <Countdown
          timer={Number(message.meta.timer)}
          callbackAfterCountdown={handleCountdownComplete}
        />
      )}
    </Wrapper>
  );
}

export default CountdownMessage;

import { memo } from "react";
import isEqual from "lodash.isequal";
import { useCallback } from "react";
import Countdown from "./Countdown";
import { MessageText, Wrapper } from "./styles";
import { CountdownMessageProps } from "./types";

function CountdownMessage({ message, own }: CountdownMessageProps) {
  const handleCountdownComplete = useCallback(() => {
    if (message.meta) {
      const features = "height=570,width=520,scrollbars=yes,status=yes";
      window.open(String(message.meta.url), "_blank", features);
    }
  }, [message.meta]);

  if (own) {
    return <MessageText>Countdown set!</MessageText>;
  }

  return (
    <Wrapper>
      <MessageText data-testid="countdown-text">
        You will be redirected to{" "}
        <a
          href={message.meta?.url as string}
          target="_blank"
          rel="noopener noreferrer"
        >
          url
        </a>{" "}
        in:
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

export default memo(CountdownMessage, (prevProps, nextProps) =>
  isEqual(prevProps.message, nextProps.message)
);

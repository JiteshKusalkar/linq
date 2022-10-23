import { memo, useEffect, useState } from "react";
import { CountdownProps } from "./types";

function Countdown({ timer, callbackAfterCountdown }: CountdownProps) {
  const [countdown, setCountdown] = useState(timer);

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown((prev) => Math.max(0, prev - 1)),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      callbackAfterCountdown?.();
    }
  }, [callbackAfterCountdown, countdown]);

  return <div>{countdown}</div>;
}

export default memo(Countdown);

import { DisplayMessageProps } from "./types";

function DisplayMessage({ message }: DisplayMessageProps) {
  return <div>{message.text}</div>;
}

export default DisplayMessage;

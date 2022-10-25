import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Editor from "../Editor";

describe("Editor", () => {
  it("should handle change in message", () => {
    const changeHandler = jest.fn();
    const messageSendHandler = jest.fn();
    render(
      <Editor onMessageSend={messageSendHandler} onChange={changeHandler} />
    );
    const text = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(text, { target: { value: "Message", name: "message" } });

    expect(changeHandler).toHaveBeenCalled();
  });

  it("should allow sending message", async () => {
    const messageSendHandler = jest.fn();
    render(<Editor onMessageSend={messageSendHandler} />);
    const text = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByText("Send");

    fireEvent.change(text, { target: { value: "Message", name: "message" } });
    fireEvent.click(sendButton);

    await waitFor(() =>
      expect(messageSendHandler).toHaveBeenCalledWith({ message: "Message" })
    );
  });
});

import { act, configure, render, screen } from "@testing-library/react";
import { Message, MessageType } from "../../DisplayMessage/types";
import CountdownMessage from "../CountdownMessage";

configure({ asyncUtilTimeout: 4000 });

describe("CountdownMessage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should show a 'countdown set' message to the author", async () => {
    const message: Message = {
      author: "Author",
      authorId: "authorId",
      createdAt: 1234567890,
      id: "id",
      room: "room",
      roomId: "roomId",
      text: "/countdown 4 http://github.com/JiteshKusalkar",
      type: MessageType.COUNTDOWN,
      meta: {
        url: "http://github.com/JiteshKusalkar",
        timer: 4,
      },
    };
    render(<CountdownMessage own={true} message={message} />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    const countdownMessage = await screen.findByText("Countdown set!");
    expect(countdownMessage).toBeInTheDocument();
  });

  it("should show a countdown to the receiver", () => {
    const message: Message = {
      author: "Author",
      authorId: "authorId",
      createdAt: 1234567890,
      id: "id",
      room: "room",
      roomId: "roomId",
      text: "/countdown 4 http://github.com/JiteshKusalkar",
      type: MessageType.COUNTDOWN,
      meta: {
        url: "http://github.com/JiteshKusalkar",
        timer: 4,
      },
    };
    render(<CountdownMessage own={false} message={message} />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(screen.getByTestId("countdown-text")).toHaveTextContent(
      "You will be redirected to"
    );
  });

  it("should open window with the url after the countdown", () => {
    const message: Message = {
      author: "Author",
      authorId: "authorId",
      createdAt: 1234567890,
      id: "id",
      room: "room",
      roomId: "roomId",
      text: "/countdown 4 http://github.com/JiteshKusalkar",
      type: MessageType.COUNTDOWN,
      meta: {
        url: "http://github.com/JiteshKusalkar",
        timer: 4,
      },
    };
    render(<CountdownMessage own={false} message={message} />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(window.open).toHaveBeenCalledWith(
      "http://github.com/JiteshKusalkar",
      "_blank",
      "height=570,width=520,scrollbars=yes,status=yes"
    );
  });
});

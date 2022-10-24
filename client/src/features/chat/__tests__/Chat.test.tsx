import { fireEvent, render, screen } from "@testing-library/react";
import Chat from "../Chat";

jest.mock("socket.io-client", () => ({
  connect: jest.fn().mockImplementation(() => ({
    emit: jest.fn(),
    on: jest.fn(),
  })),
}));

describe("Chat", () => {
  it("should join chat with valid information", async () => {
    render(<Chat />);
    const nameField = screen.getByPlaceholderText("Enter name");
    const roomField = screen.getByPlaceholderText("Enter Room ID");
    const submitButton = screen.getByText("Join Chat");

    fireEvent.change(nameField, { target: { value: "Name", name: "name" } });
    fireEvent.change(roomField, { target: { value: "Room", name: "room" } });

    fireEvent.click(submitButton);

    await expect(await screen.findByText("No user joined")).toBeInTheDocument();
  });

  it("should show error with invalid information", async () => {
    render(<Chat />);
    const submitButton = screen.getByText("Join Chat");
    fireEvent.click(submitButton);

    // one for each field: name and room
    await expect(await screen.findAllByText("Field Required!")).toHaveLength(2);
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Chat from "./Chat";

// Mock the Socket.io functionality
jest.mock("socket.io-client");

test("renders received messages", () => {
  const mockMessages = [
    { message: "Live Chat", sender: "user1", time: "10:20" },
  ];
  const mockSocket = { on: jest.fn() };

  // Render the Chat component with mocked props
  render(
    <Chat
      socket={mockSocket}
      username="test_user"
      room="5"
      messages={mockMessages}
    />
  );

  // Verify message rendering
  const message = screen.getByText("Live Chat");
  expect(message).toBeInTheDocument();

  // Simulate receiving a new message through the socket
  mockSocket.on.mock.calls[0][1]({
    message: "New message!",
    sender: "user2",
    time: "10:21",
  });

  // Verify new message rendering after receiving it through the socket
  const newMessage = screen.getByText("New message!");
  expect(newMessage).toBeInTheDocument();
});

import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const initialState = "";

function Chat({ socket, username, room, email }) {
  const [currentMsg, setCurrentMsg] = useState(initialState);
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const messageBody = {
        id: socket.id,
        room: room,
        sender: username,
        email: email,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageBody);
      setMessages((list) => [...list, messageBody]);

      setCurrentMsg(initialState);
    }
  };

  const activeChat = () => {
    if (document.hidden) {
      const payload = {
        id: socket.id,
        room: room,
        sender: username,
        email: email,
      };

      socket.emit("notify-user", payload);
    }
  };

  setInterval(() => {
    activeChat();
  }, 100000);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
        <p>New message!</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages &&
            messages.map((msg) => {
              return (
                <div
                  className="message"
                  id={username === msg.sender ? "you" : "other"}
                  key={msg.id}
                >
                  <div>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{msg.time}</p>
                      <p id="sender">{msg.sender}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="write a message..."
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

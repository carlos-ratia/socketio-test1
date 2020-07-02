import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";
const BACKEND = "http://127.0.0.1:4000";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io(BACKEND);
    socket.on("message", (msg: string) => {
      setMessages((state: string[]) => [...state, msg]);
    });

    socket.on("hi", (msg: string) => {
      setMessages((state: string[]) => [...state, msg]);
    });
  }, []);

  return (
    <div className="App">
      {messages.map((msg: string, index) => (
        <li key={index}>{msg}</li>
      ))}

      <label>
        Message:
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </label>
      <button
        onClick={() => {
          const socket = io(BACKEND);
          socket.emit("message", message);
          setMessage("")
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;

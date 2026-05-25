import React, { useState } from "react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your guide bot. How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "user", text: input }]);
    setMessages(prev => [
      ...prev,
      { from: "bot", text: "Thanks for your message! (Demo response)" }
    ]);
    setInput("");
  };

  return (
    <div>
      {/* Chatbot button */}
      <button 
        onClick={() => setOpen(!open)} 
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "10px 15px",
          borderRadius: "50%",
          background: "#007bff",
          color: "white",
          fontSize: "20px",
          border: "none",
          cursor: "pointer",
          zIndex: 1000
        }}>
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          width: "300px",
          height: "400px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          zIndex: 1000
        }}>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: "5px 0", textAlign: msg.from === "user" ? "right" : "left" }}>
                <b>{msg.from === "user" ? "You" : "Bot"}:</b> {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              style={{ flex: 1, padding: "5px" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} style={{ padding: "5px 10px" }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

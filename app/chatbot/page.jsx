"use client";
import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { role: "user", content: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.reply) {
        setChat([...newChat, { role: "bot", content: data.reply }]);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <div className="mb-4 h-64 overflow-y-auto border p-3 rounded bg-gray-50">
          {chat.map((msg, index) => (
            <p key={index} className={msg.role === "user" ? "text-blue-500" : "text-gray-700"}>
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
            </p>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 border rounded"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded ml-2"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const MessageInput = ({ onSend, onTyping, text, setText }) => {
  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
    onTyping && onTyping();
  };

  return (
    <div className="border-t border-gray-200 px-4 py-3 bg-white flex items-center gap-3">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={handleSend}
        className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        <FiSend className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MessageInput;

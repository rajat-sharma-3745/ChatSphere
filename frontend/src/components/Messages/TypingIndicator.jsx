import React from "react";

const TypingIndicator = ({ name }) => {
  return (
    <div className="px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{name} is typing</span>

        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { useChannels } from "../../context/ChannelContext";

const MessageList = ({ ref, messages, currentUserId }) => {
  const { onlineUsers } = useChannels();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
      {messages.map((msg) => {
        const isOwn = msg.sender?._id === currentUserId;
        const isOnline = !isOwn && onlineUsers?.includes(msg?.sender?._id);
        return (
          <MessageItem
            key={msg._id}
            message={msg}
            isOwn={isOwn}
            isOnline={isOnline}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;

import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { useChannels } from "../../context/ChannelContext";
import ChatSkeleton from "./ChatSkeleton";
import { FiMessageCircle } from "react-icons/fi";

const MessageList = ({ ref, messages, currentUserId,loading }) => {
  const { onlineUsers } = useChannels();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
      {loading ? (
         <ChatSkeleton/>
        ) : messages.length > 0 ? (messages.map((msg) => {
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
      }))
       :  (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10 text-gray-500">
      <FiMessageCircle className="w-14 h-14 mb-3 text-gray-400" />

      <h2 className="text-lg font-semibold text-gray-700">
        No messages yet
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Start the conversation by sending the first message.
      </p>
    </div>
  )
    }
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;

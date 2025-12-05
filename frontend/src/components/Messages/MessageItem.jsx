import React from "react";
import Avatar from "../common/Avatar";
import moment from "moment";

const MessageItem = ({ message, isOwn, isOnline }) => {
  return (
    <div
      className={`flex items-start gap-3 mb-4 ${
        isOwn ? "flex-row-reverse" : ""
      }`}
    >
      {!isOwn && (
        <div className="relative">
          <Avatar type="user" name={message.sender?.username} size="sm" />

          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
      )}

      <div className={`flex flex-col max-w-[70%] ${isOwn ? "items-end" : ""}`}>
        {!isOwn && (
          <span className="text-xs font-semibold text-gray-600 mb-1">
            {message.sender?.username}
          </span>
        )}

        <div
          className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
            isOwn
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          {message.content}
        </div>

        <span className="text-[10px] text-gray-400 mt-1">
          {moment(message.createdAt).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;

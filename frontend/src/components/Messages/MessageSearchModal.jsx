import React from "react";
import Modal from "../common/Modal";
import { FiSearch } from "react-icons/fi";
import SearchResultShimmer from "./SearchResultShimmer";

const MessageSearchModal = ({
  isOpen,
  onClose,
  query,
  setQuery,
  results = [],
  loading = false,
  onJumpToMessage,
}) => {
  function formatTimestamp(time) {
    const date = new Date(time);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${dayName}  ${day}${getOrdinal(
      day
    )} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
  }
  function getOrdinal(n) {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search Messages" size="lg">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <FiSearch className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search messages..."
            className="flex-1 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-80 overflow-y-auto flex flex-col gap-3 pr-2">
          {loading && <SearchResultShimmer />}

          {!loading && query.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center mt-10 text-gray-500 select-none">
              <FiSearch className="w-10 h-10 mb-3 text-gray-400" />
              <p className="text-lg font-medium">Search messages</p>
              <p className="text-sm text-gray-400">
                Type something to begin searching
              </p>
            </div>
          )}

          {!loading && results.length === 0 && query.length > 0 && (
            <p className="text-gray-500 text-center mt-10">No results found.</p>
          )}

          {!loading &&
            results.map((msg) => (
              <button
                key={msg._id}
                onClick={() => onJumpToMessage(msg._id,msg.page)}
                className="text-left p-3 cursor-pointer rounded-lg hover:bg-gray-100 transition"
              >
                <p className="text-gray-800 font-medium">{msg.content}</p>

                <p className="text-sm text-gray-500 mt-1">
                  {msg.sender?.username} • {formatTimestamp(msg.createdAt)}
                </p>
              </button>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default MessageSearchModal;

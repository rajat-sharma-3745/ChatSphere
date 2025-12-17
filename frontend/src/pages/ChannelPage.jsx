import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ChatHeader from "../components/Messages/ChatHeader";
import MessageInput from "../components/Messages/MessageInput";
import MessageList from "../components/Messages/MessageList";
import TypingIndicator from "../components/Messages/TypingIndicator";
import {
  CHANNEL_JOINED,
  CHANNEL_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";
import { useAppContext } from "../context/AppContext";
import { useChannels } from "../context/ChannelContext";
import { useSocket } from "../context/socketContext";
import useGetMessages from "../hooks/useGetMessages";
import { useInfiniteScrollTop } from "../hooks/useInfiniteScroll";
import { useSocketEvents } from "../hooks/useSocket";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import MessageSearchModal from "../components/Messages/MessageSearchModal";
export const dummySearchResults = [
  {
    id: "m101",
    content: "Does anyone know when the meeting starts?",
    senderName: "Alice",
    createdAt: "2025-02-11 10:24 AM",
  },
  {
    id: "m102",
    content: "The UI revision deadline is tomorrow.",
    senderName: "Bob",
    createdAt: "2025-02-11 09:18 AM",
  },
  {
    id: "m103",
    content: "I pushed the latest changes to the repo.",
    senderName: "Charlie",
    createdAt: "2025-02-10 05:42 PM",
  },
  {
    id: "m104",
    content: "Let's finalize the ChatHeader component today.",
    senderName: "Daisy",
    createdAt: "2025-02-10 02:13 PM",
  },
];

const ChannelPage = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const containerRef = useRef(null);
  const socket = useSocket();
  const { setSelectedChannel } = useChannels();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const targetMessageIdRef = useRef(null)
  const [page, setPage] = useState(1);
  const { selectedChannel } = useChannels();
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState({ username: "", typing: false });
  const TypingTimeout = useRef(null);
  const { data, loading, totalPages } = useGetMessages(id, page);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    totalPages,
    page,
    setPage,
    data
  );

  async function fetchChannel() {
    try {
      const { data } = await axiosInstance.get(API_PATHS.CHANNEL.DETAILS(id));
      setSelectedChannel(data?.channel);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  }

  async function fetchSearchResults() {
    try {
      if (!query.trim()) {
        return;
      }
      setIsSearching(true);
      const { data } = await axiosInstance.get(
        API_PATHS.MESSAGE.SEARCH(id, query)
      );
      if (data?.success) {
        setSearchResults(data?.results);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setIsSearching(false);
    }
  }
  useEffect(() => {
    const delay = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    if (!selectedChannel) {
      fetchChannel();
    }
  }, []);

  useEffect(() => {
    socket.emit(CHANNEL_JOINED, id);
    return () => {
      setText("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      socket.emit(CHANNEL_LEAVED, id);
      if (TypingTimeout.current) clearTimeout(TypingTimeout.current);
      socket.emit(STOP_TYPING, { channelId: id, username: user?.username });
      setUserTyping({ username: "", typing: false });
    };
  }, [id]);

  const newMessageHandler = useCallback(
    (data) => {
      if (data.channelId !== id) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [id]
  );
  const startTypingListener = useCallback(
    (data) => {
      if (data.channelId !== id) return;
      setUserTyping({ username: data?.username, typing: true });
    },
    [id]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.channelId !== id) return;
      setUserTyping({ username: "", typing: false });
    },
    [id]
  );
  const handleTyping = () => {
    if (!isTyping) {
      socket.emit(START_TYPING, { channelId: id, username: user?.username });
      setIsTyping(true);
    }
    if (TypingTimeout.current) clearTimeout(TypingTimeout.current);
    TypingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { channelId: id, username: user?.username });
      setIsTyping(false);
    }, 1200);
  };
  const eventHandler = {
    [NEW_MESSAGE]: newMessageHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  useSocketEvents(socket, eventHandler);
  const handleSend = (text) => {
    socket.emit(NEW_MESSAGE, { channelId: id, message: text });
  };

  const onClose = () => {
    setIsSearchOpen(false);
    setSearchResults([]);
    setQuery("");
  };
  const onJumpToMessage = (id, page) => {
    targetMessageIdRef.current=id
    setPage(page);
    onClose();
  };
  const allMessages = [...oldMessages, ...messages];
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <ChatHeader
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        channel={selectedChannel}
      />

      <MessageList
        key={id}
        ref={containerRef}
        messages={allMessages}
        currentUserId={user?._id}
        loading={loading}
        targetMessageId={targetMessageIdRef}
      />

      {userTyping.typing && <TypingIndicator name={userTyping?.username} />}

      <MessageInput
        onSend={handleSend}
        onTyping={handleTyping}
        text={text}
        setText={setText}
      />
      <MessageSearchModal
        isOpen={isSearchOpen}
        onClose={onClose}
        query={query}
        setQuery={setQuery}
        results={searchResults}
        loading={isSearching}
        onJumpToMessage={onJumpToMessage}
        
      />
    </div>
  );
};

export default ChannelPage;

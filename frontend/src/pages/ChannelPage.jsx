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

const ChannelPage = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const containerRef = useRef(null);
  const socket = useSocket();
  const { setSelectedChannel } = useChannels();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [page, setPage] = useState(1);
  const { selectedChannel } = useChannels();
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState({username:'',typing:false});
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
    setUserTyping({username:'',typing:false});
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
      setUserTyping({username:data?.username,typing:true});
    },
    [id]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.channelId !== id) return;
      setUserTyping({username:'',typing:false});
    },
    [id]
  );
  const handleTyping = () => {
    if (!isTyping) {
      socket.emit(START_TYPING, { channelId:id,username:user?.username });
      setIsTyping(true);
    }
    if (TypingTimeout.current) clearTimeout(TypingTimeout.current);
    TypingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { channelId:id,username:user?.username });
      setIsTyping(false);
    }, 2000);
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
  const allMessages = [...oldMessages, ...messages];
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <ChatHeader channel={selectedChannel} onlineCount={5} />

      {
        <MessageList
        key={id}
          ref={containerRef}
          messages={allMessages}
          currentUserId={user?._id}
          loading={loading}
        />
      }

      {userTyping.typing && <TypingIndicator name={userTyping?.username} />}

      <MessageInput
        onSend={handleSend}
        onTyping={handleTyping}
        text={text}
        setText={setText}
      />
    </div>
  );
};

export default ChannelPage;

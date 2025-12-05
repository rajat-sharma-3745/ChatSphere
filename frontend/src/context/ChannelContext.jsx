import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useSocket } from "./socketContext";
import { useSocketEvents } from "../hooks/useSocket";
import { MEMBER_JOINED, MEMBER_LEAVED, ONLINE_USERS } from "../constants/events";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);               
  const [discoverChannels, setDiscoverChannels] = useState([]); 
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [onlineUsers,setOnlineUsers] = useState([])
  const socket = useSocket();

  const fetchMyChannels = async () => {
    try {
      setLoadingChannels(true);
      const { data } = await axiosInstance.get(API_PATHS.CHANNEL.MY_CHANNELS);
      setChannels(data.channels || []);
    } finally {
      setLoadingChannels(false);
    }
  };

  const fetchDiscoverChannels = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.CHANNEL.DISCOVER);
      setDiscoverChannels(data.channels || []);
    } catch (error) {
      console.error("Discover channels fetch error:", error);
    }
  };

  useEffect(() => {
    fetchMyChannels();
    fetchDiscoverChannels();
  }, []);

  const handleJoinChannelToState = (channel) => {
    setChannels((prev) => [...prev, channel]);
    setDiscoverChannels((prev) => prev.filter((c) => c._id !== channel._id));
  };

  const handleLeaveChannelToState = (channel) => {
    setChannels((prev) => prev.filter((c) => c._id !== channel?._id));
     setDiscoverChannels((prev) => [...prev, channel]);
  };
  const updateChannelMembersInState = (channelId, updateFn) => {
  setChannels((prevChannels) =>
    prevChannels.map((channel) => {
      if (channel._id === channelId) {
        return {
          ...channel,
          members: updateFn(channel.members || [])
        };
      }
      return channel;
    })
  )}

  const onlineUserHanlder = (data) =>{
    setOnlineUsers(data);
  }
  const joinHandler = useCallback(({channelId,member})=>{
   updateChannelMembersInState(channelId, (prevMembers) => [...prevMembers, member])
  },[])
  const leaveHandler = useCallback(({channelId,memberId})=>{
   updateChannelMembersInState(channelId, (prev) => prev.filter(m => m._id !== memberId))
  },[])

  const handlers = {
    [ONLINE_USERS]:onlineUserHanlder,
    [MEMBER_JOINED]:joinHandler,
    [MEMBER_LEAVED]:leaveHandler
  }
  useSocketEvents(socket,handlers)

  return (
    <ChannelContext.Provider
      value={{
        channels,
        discoverChannels,
        selectedChannel,
        onlineUsers,
        setOnlineUsers,
        setSelectedChannel,
        loadingChannels,
        fetchMyChannels,
        fetchDiscoverChannels,
        handleJoinChannelToState,
        handleLeaveChannelToState
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannels = () => useContext(ChannelContext)

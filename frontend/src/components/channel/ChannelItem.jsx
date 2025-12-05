import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useChannels } from "../../context/ChannelContext";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAppContext } from "../../context/AppContext";
import { MEMBER_JOINED } from "../../constants/events";
import { useSocket } from "../../context/socketContext";

export const ChannelItem = ({
  channel,
  showMembers = true,
  onClose,
  selectedChat,
}) => {
  
  const navigate = useNavigate();
  const socket = useSocket();
  const { setSelectedChannel } = useChannels();
  const [loading, setLoading] = useState(false);
  const { handleJoinChannelToState } = useChannels();
  const { onlineUsers, fetchMyChannels } = useChannels();
  const onlineCount = channel?.members?.filter((m) =>
    m._id ? onlineUsers.includes(m._id) : onlineUsers.includes(m)
  ).length;
  function handleClick() {
    setSelectedChannel(channel);
    navigate(`/channel/${channel._id}`);
  }
  async function handleJoin() {
    if (showMembers) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        API_PATHS.CHANNEL.JOIN(channel?._id)
      );
      if (data?.success) {
        toast.success(data?.message);
        handleJoinChannelToState(data?.channel);
        onClose();
        socket.emit(MEMBER_JOINED, channel._id);
        setSelectedChannel(channel);
        navigate(`/channel/${channel._id}`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error while joining channel"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`w-full flex items-center gap-3 p-3 rounded-xl ${
        showMembers && "hover:bg-gray-100"
      }  transition ${selectedChat && "bg-gray-200"}`}
    >
      <button
        onClick={showMembers && handleClick}
        className="flex items-center gap-3 flex-1 text-left"
      >
        <Avatar type="channel" name={channel.name} size="md" />

        <div className="flex flex-col flex-1">
          <span className="font-medium text-gray-800">{channel.name}</span>

          {showMembers && (
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <FiUsers className="w-4 h-4" />
              {onlineCount || 0} online
            </span>
          )}
        </div>
      </button>

      {!showMembers && (
        <button
          onClick={handleJoin}
          className="px-3 py-1 text-sm cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? <LuLoaderCircle className="animate-spin" /> : "Join"}
        </button>
      )}
    </div>
  );
};

import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { FiInfo, FiLogOut } from "react-icons/fi";
import ChannelInfoModal from "../channel/ChannelInfoModal";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useChannels } from "../../context/ChannelContext";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ channel, onlineCount = 0 }) => {
  const navigate = useNavigate();
  const [infoOpen, setInfoOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const { handleLeaveChannelToState, setSelectedChannel } = useChannels();
  async function leaveChannel() {
    try {
      setIsLeaving(true);
      const { data } = await axiosInstance.delete(
        API_PATHS.CHANNEL.LEAVE(channel?._id)
      );
      if (data?.success) {
        toast.success(data?.message);
        handleLeaveChannelToState(data?.channel);
        setSelectedChannel(null);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error while leaving channel"
      );
    } finally {
      setIsLeaving(false);
    }
  }
  return (
    <>
      <header className="w-full px-4 py-3 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar type="channel" name={channel?.name} size="md" />

          <div className="flex flex-col leading-tight">
            <h2 className="text-lg font-semibold text-gray-800">
              {channel?.name}
            </h2>

            <button
              onClick={() => setInfoOpen(true)}
              className="text-sm cursor-pointer text-blue-600 hover:underline flex items-center gap-1"
            >
              <FiInfo className="w-4 h-4" />
              Channel Info
            </button>
          </div>
        </div>

        <button
          onClick={leaveChannel}
          className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          {isLeaving ? (
            <LuLoaderCircle className="animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Leave</span>
              <FiLogOut className="w-5 h-5" />
            </>
          )}
        </button>
      </header>

      <ChannelInfoModal
        isOpen={infoOpen}
        onClose={() => setInfoOpen((p) => !p)}
        channel={channel}
      />
    </>
  );
};

export default ChatHeader;

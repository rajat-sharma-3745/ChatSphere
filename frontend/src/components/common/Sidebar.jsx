import React from "react";
import { ChannelList } from "../channel/ChannelList";
import UserProfile from "../UserProfile";
import { useAppContext } from "../../context/AppContext";
import { useChannels } from "../../context/ChannelContext";

const Sidebar = () => {
  const { user, logout } = useAppContext();
  const { channels } = useChannels();
  return (
    <div className="h-full w-full flex flex-col bg-white border-r border-gray-200">
      <div className="flex-1 overflow-y-auto p-3">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 px-1">
          Channels
        </h2>
        <ChannelList channels={channels} showMembers={true} />
      </div>

      <UserProfile user={user} onLogout={logout} />
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { FiMenu, FiLogOut, FiSearch, FiMessageCircle, FiPlus } from "react-icons/fi";
import Modal from "./common/Modal";
import { ChannelList } from "./channel/ChannelList";
import CreateChannelModal from "./channel/CreateChannelModal";
import { useChannels } from "../context/ChannelContext";

const Navbar = ({ onToggleSidebar }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const {discoverChannels} = useChannels();

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 shadow-sm bg-white border-b border-gray-200">
        <div className="text-xl font-bold tracking-tight flex items-center gap-2">
          <FiMessageCircle className="w-6 h-6" />
          ChatSphere
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreateOpen(true)}
            className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <FiPlus className="w-5 h-5" />
            <span className="hidden md:inline">Create</span>
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 transition"
          >
            <FiSearch className="w-6 h-6" />
          </button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={onToggleSidebar}
          >
            <FiMenu className="w-6 h-6" />
          </button>

         
        </div>
      </nav>

      <Modal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Browse Channels"
        size="md"
      >
        <ChannelList
          channels={discoverChannels}
          showMembers={false}
         onClose={() => setSearchOpen(false)}
        />
      </Modal>
      <CreateChannelModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        
      />
    </>
  );
};

export default Navbar;

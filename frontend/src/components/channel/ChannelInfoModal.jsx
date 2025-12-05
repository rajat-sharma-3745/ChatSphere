import React from "react";
import Modal from "../common/Modal";
import Avatar from "../common/Avatar";
import { useChannels } from "../../context/ChannelContext";

const ChannelInfoModal = ({ isOpen, onClose, channel }) => {
  const { onlineUsers } = useChannels();
  if (!channel) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`#${channel.name} Info`}
      size="md"
    >
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            Description
          </h3>
          <p className="text-gray-600">
            {channel.description || "No description provided."}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Members ({channel.members?.length || 0})
          </h3>

          <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-2">
            {channel.members?.map((member) => {
              const isOnline = onlineUsers.includes(member._id);
              return (
                <div
                  key={member._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Avatar type="user" name={member?.username} size="sm" />
                  <span className="text-gray-800">{member?.username}</span>
                  {isOnline && (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChannelInfoModal;

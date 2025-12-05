import { useParams } from "react-router-dom";
import { ChannelItem } from "./ChannelItem";

export const ChannelList = ({ channels = [], showMembers = true, onClose }) => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-2">
      {channels.map((ch) => (
        <ChannelItem
          key={ch._id}
          channel={ch}
          showMembers={showMembers}
          onClose={onClose}
          selectedChat={id === ch._id}
        />
      ))}
    </div>
  );
};

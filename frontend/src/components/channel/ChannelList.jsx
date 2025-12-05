import { useParams } from "react-router-dom";
import { ChannelItem } from "./ChannelItem";
import { useChannels } from "../../context/ChannelContext";
import { ChannelItemSkeleton } from "./ChannelItemSkeleton";

export const ChannelList = ({ channels = [], showMembers = true, onClose }) => {
  const { id } = useParams();
  const { loadingChannels } = useChannels();
  return (
    <div className="flex flex-col gap-2">
      {loadingChannels ? (
        Array.from({ length: 9 }).map((_, i) => <ChannelItemSkeleton key={i} />)
      ) : channels.length > 0 ? (
        channels.map((ch) => (
          <ChannelItem
            key={ch._id}
            channel={ch}
            showMembers={showMembers}
            onClose={onClose}
            selectedChat={id === ch._id}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">
          No channels joined.
        </p>
      )}
    </div>
  );
};

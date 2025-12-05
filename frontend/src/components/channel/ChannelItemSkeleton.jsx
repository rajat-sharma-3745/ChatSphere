export const ChannelItemSkeleton = () => {
  return (
    <div className="w-full flex items-center gap-3 p-3 rounded-xl transition">
      {/* Avatar placeholder */}
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

      <div className="flex flex-col flex-1 gap-2">
        {/* Channel name placeholder */}
        <div className="w-36 h-4 rounded-md bg-gray-200 animate-pulse" />

        {/* Online count placeholder (only visible when showMembers in real UI) */}
        <div className="w-20 h-3 rounded-md bg-gray-200 animate-pulse" />
      </div>

      
    </div>
  );
};
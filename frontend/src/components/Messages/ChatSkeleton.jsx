import React from "react";

const Shimmer = "animate-pulse bg-gray-200 rounded-full";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full p-4">

     

      <div className="flex-1 overflow-y-auto flex flex-col gap-4 mt-2">

        <div className="flex gap-3">
          <div className={`w-8 h-8 ${Shimmer}`}></div>
          <div className="flex flex-col gap-2">
            <div className="w-40 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-56 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <div className="flex flex-col items-end gap-2">
            <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        <div className="flex gap-3">
          <div className={`w-8 h-8 ${Shimmer}`}></div>
          <div className="flex flex-col gap-2">
            <div className="w-52 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-28 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
         <div className="flex gap-3 justify-end">
          <div className="flex flex-col items-end gap-2">
            <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className={`w-8 h-8 ${Shimmer}`}></div>
          <div className="flex flex-col gap-2">
            <div className="w-52 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-28 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
         <div className="flex gap-3 justify-end">
          <div className="flex flex-col items-end gap-2">
            <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className={`w-8 h-8 ${Shimmer}`}></div>
          <div className="flex flex-col gap-2">
            <div className="w-52 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-28 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
         <div className="flex gap-3 justify-end">
          <div className="flex flex-col items-end gap-2">
            <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>

     

    </div>
  );
};

export default ChatSkeleton;

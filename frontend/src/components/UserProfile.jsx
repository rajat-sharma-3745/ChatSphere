import React from "react";
import Avatar from "./common/Avatar";
import { FiLogOut } from "react-icons/fi";

const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="w-full flex items-center justify-between p-3 border-t border-gray-200">
      
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar type="user" name={user?.username} size="sm" />

        <div className="flex flex-col leading-tight">
          <span className="font-medium text-gray-800 truncate">{user?.username}</span>
          <span className="text-sm text-green-600 font-light">Online</span>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex cursor-pointer items-center gap-2 px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition whitespace-nowrap"
      >
        <span className="hidden md:inline">Logout</span>
        <FiLogOut className="w-3 h-3" />
      </button>
    </div>
  );
};

export default UserProfile;

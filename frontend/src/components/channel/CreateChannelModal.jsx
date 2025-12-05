import React, { useState } from "react";
import Modal from "../common/Modal";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";
import { useChannels } from "../../context/ChannelContext";
const CreateChannelModal = ({ isOpen, onClose }) => {
  const { handleJoinChannelToState } = useChannels();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(API_PATHS.CHANNEL.CREATE, {
        name,
        description,
        isPrivate,
      });
      if (data?.success) {
        toast.success(data?.message);
        handleJoinChannelToState(data?.channel);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error while creating channel"
      );
    } finally {
      setLoading(false);
      setName("");
      setDescription("");
      setIsPrivate(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Channel"
      size="md"
    >
      <div className="flex flex-col gap-4 text-gray-700">
        <div className="flex flex-col gap-1">
          <label className="font-medium">Channel Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter channel name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What is this channel about?"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Private Channel</span>

          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className={`w-12 h-6 rounded-full transition relative ${
              isPrivate ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-md transition ${
                isPrivate ? "right-1" : "left-1"
              }`}
            ></div>
          </button>
        </div>

        <div className="flex justify-end mt-2">
          <button
            onClick={handleCreate}
            className="px-4 py-2 cursor-pointer bg-blue-600 flex justify-center text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? <LuLoaderCircle className="animate-spin" /> : "Create"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateChannelModal;

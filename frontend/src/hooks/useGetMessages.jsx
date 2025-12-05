import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const useGetMessages = (channelId, page) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!channelId || !page) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(API_PATHS.MESSAGE.GET(channelId, page));

        setData(data.messages);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Message fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channelId, page]);

  return { data, loading, totalPages };
};

export default useGetMessages


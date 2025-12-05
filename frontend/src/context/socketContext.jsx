import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { server } from "../utils/apiPaths";
import { MEMBER_JOINED } from "../constants/events";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  useEffect(() => {
    socket.connect();
    return () => socket.close();
  }, [socket]);
  
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

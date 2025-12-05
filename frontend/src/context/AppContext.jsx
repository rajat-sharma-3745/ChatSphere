import React, { createContext, useContext, useState } from "react";
import { toast, Toaster } from "sonner";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const AppContext = createContext(null);


const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const logout = async() => {
    try {
      setUser(null);
      localStorage.clear();
      const {data} = await axiosInstance.get(API_PATHS.USER.LOGOUT)
    } catch (error) {
      console.log(error)
    }
  };
  const value={setUser,user,logout}
  return <AppContext.Provider value={value}>
    <Toaster position="top-right" />
   {children}
  </AppContext.Provider>
};

export const useAppContext = () => useContext(AppContext);
export default AppProvider;

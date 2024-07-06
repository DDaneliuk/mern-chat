import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {authUser} = useAuthContext();

  let SOCKET_URL = ''

  if(import.meta.env.MODE === 'development'){
    SOCKET_URL = process.env.SOCKET_DEV
  } if (import.meta.env.MODE === 'production'){
    SOCKET_URL = process.env.SOCKET_PROD
  }

  useEffect(() => {
    if(authUser) {
      const socket = io(SOCKET_URL, {
        query: { userId: authUser._id }
      });

      setSocket(socket);

      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else{
      if(socket){
        socket.close();
        setSocket(null)
      }
    }
  },[authUser])
  return (<SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>)
}
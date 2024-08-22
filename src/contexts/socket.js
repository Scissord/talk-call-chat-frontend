import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const auth = useContext(AuthContext);

  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [raiseConversation, setRaiseConversation] = useState(null);
  const [raisedConversations, setRaisedConversations] = useState([]);

  useEffect(() => {
    if(auth.user.id) {
      const socket = io("http://31.128.41.42:8080", {
        query: {
          user_id: auth.user.id,
        },
      });
      setSocket(socket);
      return () => socket.close();
    } else {
      if(socket) {
        socket.close();
        setSocket(null);
      };
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        newMessage,
        raiseConversation,
        raisedConversations,
        setRaisedConversations
      }}
    >
      {children}
    </SocketContext.Provider>
  )
};
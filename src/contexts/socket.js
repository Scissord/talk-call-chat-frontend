import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const auth = useContext(AuthContext);

  const [newMessage, setNewMessage] = useState(null);
  const [raiseConversation, setRaiseConversation] = useState(null);
  const [raisedConversations, setRaisedConversations] = useState([]);

  useEffect(() => {
    let newSocket = null;

    const connect = () => {
      if(!newSocket) {
        newSocket = new WebSocket(`ws://31.128.41.42:8000/ws`)

        newSocket.onopen = () => {
          console.log("Connected to the server");
        };

        newSocket.onerror = (error) => {
          console.log("WebSocket error: ", error);
        };

        newSocket.onclose = () => {
          console.log("WebSocket disconnect");
        }

        newSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if(data.type === 'new_message') {
            setNewMessage({
              chat_phone: data.chat_phone,
              id: data.id,
              message_incoming: data.message_incoming,
              message_text: data.message_text,
              sender: data.sender
            });
          };

          if(data.type === "raise_customer") {
            const obj = {
              customer_good: data.customer_good,
              customer_id: data.customer_id,
              customer_phone: data.customer_phone,
              customer_type: data.customer_type,
              leadvertex_id: data.leadvertex_id,
              counter: 1
            }
            setRaiseConversation(obj);
            setRaisedConversations((prev) => [...prev, obj])
          }
        };
      }
    }

    // connect();

    return () => {
      if(newSocket) {
        newSocket.close();
      }
    };
  }, [])

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
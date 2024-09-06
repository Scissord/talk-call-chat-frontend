import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [raiseConversation, setRaiseConversation] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (auth.user) {
      const clientId = auth.user.id;
      const ws = new WebSocket(`wss://ai.restrain.pw/ws/${clientId}`);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if(data.type === "new_message") {
          const message = JSON.parse(data.message);
          if(+auth.user.role.id === 1 || +auth.user.role.id === 2) {
            return;
          } else {
            setNewMessage(message);
          };
        };
        if(data.type === "up_customer") {
          const customer = JSON.parse(data.customer);
          customer.counter = 1;
          if(+auth.user.role.id === 1 || +auth.user.role.id === 2) {
            return;
          } else {
            setRaiseConversation(customer);
          };
        };
        if(data.type === "updated_status") {
          const customer = JSON.parse(data.customer);
          if(+auth.user.role.id === 1 || +auth.user.role.id === 2) {
            return;
          } else {
            setCustomer(customer);
          };
        };
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [auth.user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        newMessage,
        raiseConversation,
        customer
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

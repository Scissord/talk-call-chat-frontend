import { useAppSelector } from "@hooks";
import { ICustomer, IMessage } from "@interfaces";
import { RootState } from "@store/index";
import { getUser } from "@store/reducers/authSlice";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface SocketContextType {
  socket: WebSocket | null;
  newMessage: IMessage | null;
  raiseConversation: any;
  newCustomer: ICustomer | null;
  blockIds: string[];
};

type SocketProps = {
  children: ReactNode;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

export const SocketContextProvider: FC<SocketProps> = ({ children }) => {
  const user = useAppSelector((state: RootState) => getUser(state));

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState<IMessage | null>(null);
  const [raiseConversation, setRaiseConversation] = useState<any>(null);
  const [newCustomer, setNewCustomer] = useState<ICustomer | null>(null);
  const [blockIds, setBlockIds] = useState<string[] | []>([]);

  useEffect(() => {
    if (user) {
      const userId = user.id;
      const ws = new WebSocket(`wss://ai.restrain.pw/ws/${userId}`);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        console.log(event);
        const data = JSON.parse(event.data);
        if(data.type === "new_message") {
          const message = JSON.parse(data.message);
          if(+user.role.id === 1 || +user.role.id === 2) {
            return;
          } else {
            setNewMessage(message);
          };
        };
        if(data.type === "up_customer") {
          const customer = JSON.parse(data.customer);
          customer.counter = 1;
          if(+user.role.id === 1 || +user.role.id === 2) {
            return;
          } else {
            setRaiseConversation(customer);
          };
        };
        if(data.type === "updated_status") {
          const customer = JSON.parse(data.customer);
          if(+user.role.id === 1 || +user.role.id === 2) {
            return;
          } else {
            setNewCustomer(customer);
          };
        };
        if(data.type === "onDragStart") {
          if(+user.role.id === 1 || +user.role.id === 2) {
            return;
          } else {
            if(+user.id !== +data.user_id) {
              console.log(blockIds);
              const newBlockIds = [...blockIds]
              newBlockIds.push(data.customer_id);
              setBlockIds(newBlockIds);
            };
          };
        };
        if(data.type === "onDragEnd") {
          console.log('here')
          if(+user.role.id === 1 || +user.role.id === 2) {
            return;
          } else {
            if(+user.id !== +data.user_id) {
              const newBlockIds = [...blockIds]
              console.log(newBlockIds);
              const index = newBlockIds.indexOf(data.customer_id);
              if (index !== -1) {
                newBlockIds.splice(index, 1);
                setBlockIds(newBlockIds);
              }
              console.log(newBlockIds);
            };
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
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        newMessage,
        raiseConversation,
        newCustomer,
        blockIds
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

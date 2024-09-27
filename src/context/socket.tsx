import { useAppSelector } from "@hooks";
import { ICustomer, IMessage } from "@interfaces";
import { RootState } from "@store/index";
import { getUser } from "@store/reducers/authSlice";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

interface SocketContextType {
  socket: WebSocket | null;
  newMessage: IMessage | null;
  // sender: ICustomer | null;
  blockIds: string[];
  newCardSpot: any;
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

  // Если нам написали, то поднять в чате, и поднять в колонке
  const [newMessage, setNewMessage] = useState<IMessage | null>(null);
  // const [sender, setSender] = useState<ICustomer | null>(null);

  // const [raiseConversation, setRaiseConversation] = useState<any>(null);

  // Если он падает в кд, или пд, то добавить в начало колонки
  // const [newCustomer, setNewCustomer] = useState<ICustomer | null>(null);

  // Для drag'n'drop
  const [blockIds, setBlockIds] = useState<string[] | []>([]);
  const [newCardSpot, setNewCardSpot] = useState<any>(null);

  useEffect(() => {
    if (user) {
      const userId = user.id;
      const ws = new WebSocket(`wss://ai.restrain.pw/ws/${userId}`);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Если нам написали, то поднять в чате, и поднять в колонке
        if(data.type === "new_message") {
          const message = JSON.parse(data.message);
          // const sender = JSON.parse(data.customer);
          setNewMessage(message);
          // setSender(sender);
        };
        // Если он падает в кд, или пд, то добавить в начало колонки
        // if(data.type === "updated_status") {
        //   const customer = JSON.parse(data.customer);
        //   setNewCustomer(customer);
        // };
        if(data.type === "onDragStart") {
          if(+user.id !== +data.user_id) {
            const newBlockIds = [...blockIds]
            newBlockIds.push(data.customer_id);
            setBlockIds(newBlockIds);
          };
        };
        if(data.type === "onDragEnd") {
          if(+user.id !== +data.user_id) {
            const newBlockIds = blockIds.filter(id => +id !== +data.customer_id);
            setBlockIds(newBlockIds);
            setNewCardSpot(data);
          };
        };
        // if(data.type === "up_customer") {
        //   const customer = JSON.parse(data.customer);
        //   customer.counter = 1;
        //   setRaiseConversation(customer);
        // };
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
        // sender,
        // raiseConversation,
        blockIds,
        newCardSpot
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

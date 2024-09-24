import axios from "@axios";
import { FC, useEffect, useRef, useState } from "react";
import { useSocketContext } from "@context";
import { useChats } from "@context";
import { IMessage } from "@interfaces";
import Message from "./Chat/Message";
import './scroll.css'

const Chat: FC = () => {
  const { customer, conversation, setSearch, setConversation } = useChats();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [activeMessageId, setActiveMessageId] = useState<string>("");
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const { newMessage } = useSocketContext();

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (newMessage) {
      handleUpdateNewMessage(newMessage);
    }
  }, [newMessage]);

  const handleUpdateNewMessage = (newMessage: IMessage) => {
    if(customer?.id && +customer?.id === +newMessage.customer_id) {
      const newConversation = [...conversation];
      newConversation.push(newMessage);
      setConversation(newConversation);
    };
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContextMenu = (event: any, messageId: string) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setActiveMessageId(messageId);
  };

  const onCloseMenu = () => {
    setActiveMessageId("");
    setMenuPosition({ x: 0, y: 0 });
    setSearch("");
  };

  const replyMessage = async (message_id: string, customer_id: string) => {
    await axios({
      method: 'POST',
      url: "/messages/reply",
      data: { message_id, customer_id }
    }).then(() => {
      setActiveMessageId("");
      setSearch("");
    });
  };

  return (
    <div className={`
      w-full h-full flex flex-col gap-3 px-3 py-6
      ${activeMessageId !== "" ? "overflow-hidden" : "scroll"}
    `}>
      {conversation?.length > 0 && conversation?.map((message) => (
        <Message
          key={message.id}
          message={message}
          isActive={+activeMessageId === +message?.id}
          onContextMenu={(event) => handleContextMenu(event, message.id)}
          onCloseMenu={onCloseMenu}
          replyMessage={replyMessage}
          menuPosition={menuPosition}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Chat;

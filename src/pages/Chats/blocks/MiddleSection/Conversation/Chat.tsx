import { FC, Fragment, useEffect, useRef } from "react";
import { useSocketContext } from "@context";
import Message from "./Chat/Message";
import { useChats } from "@context";
import { IMessage } from "@interfaces";

const Chat: FC = () => {
  const { customer, conversation, setConversation } = useChats();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className='w-full h-full flex flex-col gap-3 overflow-y-auto px-6 py-6'>
      {conversation?.length > 0 && conversation?.map((message) => (
        <Fragment key={message.id}>
          <Message
            message={message}
          />
        </Fragment>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Chat;

import { useSocketContext } from "contexts/socket";
import { Fragment, useEffect, useRef } from "react";
import Message from "./chat/message";

const Chat = ({ conversation, setConversation, activeCustomer }) => {

  const messagesEndRef = useRef(null);

  const { newMessage } = useSocketContext();

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (newMessage) {
      handleUpdateNewMessage(newMessage);
    }
  }, [newMessage]);

  const handleUpdateNewMessage = (newMessage) => {
    if(activeCustomer.customer_phone === newMessage.chat_phone) {
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

  const openGoogleMaps = (lat, lon) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    window.open(url, '_blank');
  };

  return (
    <div className='w-full h-full flex flex-col gap-3 overflow-y-auto px-6 py-6'>
      {conversation?.length > 0 && conversation?.map((message) => (
        <Fragment key={message.id}>
          <Message
            message={message}
            openGoogleMaps={openGoogleMaps}
          />
        </Fragment>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Chat;

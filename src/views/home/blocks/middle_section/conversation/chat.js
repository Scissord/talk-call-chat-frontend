import { useSocketContext } from "contexts/socket";
import { useEffect, useRef } from "react";
import { ChatAudio } from "components/lib";

const Chat = ({ conversation, setConversation, activeConversation }) => {

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
    if(activeConversation.customer_phone === newMessage.chat_phone) {
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
        <div
          key={message.id}
          className={`flex items-end gap-2 ${!message.message_incoming ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <img src={message.sender_avatar ?? 'assets/avatar-default.svg'} alt='avatar' className='h-10 w-10 rounded-full border border-slate-300'/>
          <div 
            className={`
              inline-block min-w-[10px] max-w-[50%]
              ${message.message_incoming && !message.attachment_url && 'rounded-r-xl rounded-tl-xl bg-[#fff] text-black px-3 py-3'}
              ${!message.message_incoming && !message.attachment_url && 'rounded-l-xl rounded-tr-xl bg-[#0086FF] text-white px-3 py-3'}
            `}
          >
            {message.message_type === "message" && <>{message.message_text}</>}
            {message.message_type === "photo" && 
              <img
                src={
                  message.attachment_url ? (
                    !message.message_incoming ?
                      'http://31.128.41.42:8000/v1/' + message.attachment_url 
                      : message.attachment_url
                  ) : 'assets/no-image.jpg'
                } 
                alt={`message_${message.id}`} 
                className='w-fit min-h-16 max-h-40 rounded-lg'
              />}
            {(message.message_type === "doc" || message.message_type === 'audio') && <ChatAudio src={message.attachment_url} />}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Chat
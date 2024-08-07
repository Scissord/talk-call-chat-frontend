import { useSocketContext } from "contexts/socket";
import { Fragment, useEffect, useRef } from "react";
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
          className={`flex items-end gap-2 ${!message.incoming ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <img src={message.avatar ?? 'assets/avatar-default.svg'} alt='avatar' className='h-10 w-10 rounded-full border border-slate-300'/>
          <div
            className={`
              inline-block min-w-[10px] max-w-[50%]
              ${message.incoming && !message.attachment_url && 'rounded-r-xl rounded-tl-xl bg-gray-200 text-black px-3 py-3'}
              ${!message.incoming && !message.attachment_url && 'rounded-l-xl rounded-tr-xl bg-[#0086FF] text-white px-3 py-3'}
            `}
          >
            <p>{message?.text}</p>
            {message?.attachments?.map((attachment) => (
              <Fragment key={attachment.id}>
                {attachment.type === 'photo' && <img
                  src={attachment.url}
                  alt={message.url}
                  className='w-fit min-h-16 max-h-40 rounded-lg'
                />}
                {attachment.type === 'doc' && <a
                  href={attachment.url}
                  alt={message.url}
                  target="_blank"
                  className='hover:text-blue-500'
                >
                  Скачать
                </a>}
                {attachment.type === 'audio' && <ChatAudio
                  src={attachment.url}
                />}
              </Fragment>
            ))}

          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Chat
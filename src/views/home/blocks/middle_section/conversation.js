import ChatTitle from './conversation/chat_title';
import Chat from './conversation/chat';
import ChatFooter from './conversation/chat_footer';
import { useContext } from 'react';
import { ViewContext } from 'contexts/view';

const Conversation = ({
  isFavorite,
  conversation,
  setConversation,
  fetchConversations,
  activeCustomer,
  setActiveCustomer,
  message,
  setMessage,
  file,
  setFile,
  handleSendMessage,
  setConversations,
  setCurrentPage,
  audio,
  setAudio,
  rAudio,
  setRAudio,
  isMessageSending
}) => {
  const context = useContext(ViewContext);

  return (
    <div className='flex flex-col justify-between sm:w-1/2 overflow-y-auto'>
      {activeCustomer.id ? (
        <>
          <ChatTitle
            isFavorite={isFavorite}
            activeCustomer={activeCustomer}
            setActiveCustomer={setActiveCustomer}
            title={activeCustomer.customer_good}
            fetchConversations={fetchConversations}
            setConversations={setConversations}
            setCurrentPage={setCurrentPage}
          />
          <Chat
            conversation={conversation}
            setConversation={setConversation}
            activeCustomer={activeCustomer}
          />
          <ChatFooter
            file={file}
            setFile={setFile}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            audio={audio}
            setAudio={setAudio}
            rAudio={rAudio}
            setRAudio={setRAudio}
            isMessageSending={isMessageSending}
          />
        </>
      ) : (
        <div className='h-full flex flex-col items-center justify-center pb-10'>
          <p
            className={`
              font-bold text-2xl
              ${context.colorMode.theme === 0 && 'text-black'}
              ${context.colorMode.theme === 1 && 'text-white'}
            `}
          >
            Пожалуйста выберите чат
          </p>
          <img src='assets/to_left.png' className='w-1/2'/>
        </div>
      )}
    </div>
  )
}

export default Conversation
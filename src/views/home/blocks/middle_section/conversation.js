import ChatTitle from './conversation/chat_title';
import Chat from './conversation/chat';
import ChatFooter from './conversation/chat_footer';
import { useContext } from 'react';
import { ViewContext } from 'contexts/view';

const Conversation = ({
  conversation,
  setConversation,
  fetchConversations,
  activeConversation,
  setActiveConversation,
  message,
  setMessage,
  file,
  setFile,
  handleSendMessage,
  setConversations,
  setCurrentPage
}) => {
  const context = useContext(ViewContext);

  return (
    <div className='flex flex-col justify-between sm:w-1/2 overflow-y-auto'>
      {activeConversation.customer_id ? (
        <>
          <ChatTitle
            isFavorite={activeConversation.isFavorite}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
            title={activeConversation.customer_good}
            fetchConversations={fetchConversations}
            setConversations={setConversations}
            setCurrentPage={setCurrentPage}
          />
          <Chat
            conversation={conversation}
            setConversation={setConversation}
            activeConversation={activeConversation}
          />
          <ChatFooter
            file={file}
            setFile={setFile}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
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
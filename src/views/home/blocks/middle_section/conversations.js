import TopConversations from './conversations/top_conversations';
import MiddleConversations from './conversations/middle_conversations';
import FloatingButton from './conversations/floating_button';
import { useSocketContext } from 'contexts/socket';

const Conversations = (props) => {
  const {
    activeConversation, setActiveConversation,
    type, setType, conversations, setConversations,
    fetchConversation, setCurrentPage,
    currentPage, setFile
  } = props;

  const { raisedConversations, setRaisedConversations } = useSocketContext();

  const handleChatClick = (conversation) => {
    // if (raisedConversations && raisedConversations.length > 0) {
    //   setConversations((prevConversations) => {
    //     return prevConversations.map((c) => {
    //       const exist = raisedConversations.find((raisedConv) => raisedConv.customer_id === c.customer_id);
    //       if (exist && c.customer_id === conversation.customer_id) {
    //         return { ...c, counter: null };
    //       }
    //       return c;
    //     });
    //   });

    //   const newRaisedConversations = raisedConversations.filter(
    //     (raisedConv) => raisedConv.customer_id !== conversation.customer_id
    //   );
    //   setRaisedConversations(newRaisedConversations);
    // }

    setActiveConversation(conversation);
    fetchConversation(conversation.id);
    setFile(null);
  };


  return (
    <div className='flex flex-col h-full w-full sm:w-1/4 overflow-y-auto border-r border-slate-300 relative'>
      <TopConversations
        type={type}
        setType={setType}
        setCurrentPage={setCurrentPage}
        setConversations={setConversations}
      />
      <MiddleConversations
        conversations={conversations}
        activeConversation={activeConversation}
        handleChatClick={handleChatClick}
        setConversations={setConversations}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <FloatingButton
        setConversations={setConversations}
      />
    </div>
  )
}

export default Conversations;

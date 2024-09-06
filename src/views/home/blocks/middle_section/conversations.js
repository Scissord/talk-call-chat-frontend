import TopConversations from './conversations/top_conversations';
import MiddleConversations from './conversations/middle_conversations';
import FloatingButton from './conversations/floating_button';
// import { useSocketContext } from 'contexts/socket';

const Conversations = (props) => {
  const {
    activeCustomer, setActiveCustomer,
    type, setType, conversations, setConversations,
    fetchConversation, setCurrentPage,
    currentPage, setFile
  } = props;

  const handleChatClick = (customer) => {
    const conversation = conversations.find((c) => +c.id === +customer.id);
    if (conversation) {
      const updatedConversation = { ...conversation, counter: undefined };

      const newConversations = conversations.map((c) =>
        +c.id === +customer.id ? updatedConversation : c
      );

      setConversations(newConversations);
    };

    setActiveCustomer(customer);
    fetchConversation(customer.id);
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
        activeCustomer={activeCustomer}
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

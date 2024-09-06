import { Icon } from 'components/lib';
import { AuthContext } from 'contexts/auth';
import { useSocketContext } from 'contexts/socket'
import { ViewContext } from 'contexts/view'
import React, { useContext, useEffect, useRef } from 'react'

const MiddleConversations = (props) => {
  const {
    conversations,
    activeCustomer, handleChatClick,
    setConversations, setCurrentPage,
    currentPage
  } = props;

  const auth = useContext(AuthContext);
  const containerRef = useRef(null);

  const context = useContext(ViewContext);
  const { raiseConversation, customer } = useSocketContext();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
          setCurrentPage(prev => prev + 1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentPage]);

  useEffect(() => {
    if(raiseConversation) {
      handleRaiseConversation();
    };
  }, [raiseConversation]);

  useEffect(() => {
    if(customer) {
      handleUpdateCustomerStatus();
    };
  }, [customer]);

  const handleUpdateCustomerStatus = () => {
    setConversations((prevConversations) => {
      const existIndex = prevConversations.findIndex((c) => c.order_id === customer.order_id);
      const status = +auth.user.role.status;

      if (existIndex !== -1) {
        if(status === 100) {
          return [
            customer,
            ...prevConversations.filter((_, index) => index !== existIndex)
          ];
        } else if (status === +customer.status) {
          return [
            customer,
            ...prevConversations.filter((_, index) => index !== existIndex)
          ];
        } else {
          return [
            ...prevConversations.filter((_, index) => index !== existIndex)
          ];
        };
      } else {
        if(status === 100) {
          return [
            customer,
            ...prevConversations
          ];
        } else if(status === +customer.status) {
          return [
            customer,
            ...prevConversations
          ];
        };
      };

      return prevConversations;
    });
  };

  const handleRaiseConversation = () => {
    setConversations((prevConversations) => {
      const existIndex = prevConversations.findIndex((c) => +c.id === +raiseConversation.id);

      if (existIndex !== -1) {
        const existingConversation = prevConversations[existIndex];
        existingConversation.counter = (existingConversation.counter || 0) + (raiseConversation.counter);
        prevConversations.splice(existIndex, 1);

        return [existingConversation, ...prevConversations];
      } else {
        return [{ ...raiseConversation, counter: raiseConversation.counter || 0 }, ...prevConversations];
      }
    });
  };

  return (
    <div ref={containerRef} className='flex-grow overflow-y-auto'>
      {conversations.length > 0 && conversations.map((conversation, i) => (
        <div
          key={conversation.id}
          onClick={() => handleChatClick(conversation)}
          className={`relative select-none
            cursor-pointer flex items-center gap-2 px-5 py-3
            ${context.colorMode.theme === 0 && 'hover:bg-gray-300'}
            ${context.colorMode.theme === 1 && 'hover:bg-[#2d3f65]'}
            ${activeCustomer.id === conversation.id && context.colorMode.theme === 0 && 'bg-gray-300'}
            ${activeCustomer.id === conversation.id && context.colorMode.theme === 1 && 'bg-[#2d3f65]'}
          `}
        >
          {activeCustomer.id === conversation.id &&
            <div className='absolute left-0 h-full w-1 bg-[#0086FF]'/>
          }
          <div className="relative inline-block">
            <img
              src={conversation.avatar ?? 'assets/avatar-default.svg'}
              className='border border-slate-300 rounded-full w-10 h-10'
            />
          </div>

          <div className='flex flex-col'>
            <p className={`font-semibold text-[15px] ${context.colorMode.theme === 0 ? 'text-black' : 'text-white'}`}>
              {conversation.name}
            </p>
            <div className='flex items-center overflow-hidden gap-1'>
              <p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[var(--msg-message)] text-[13px]">
                {conversation.order_id}
              </p>
              {/* <p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[var(--msg-message)] text-[13px]">
                {conversation?.lastMessage.length > 35 ? `${conversation?.lastMessage.slice(0, 35)}...` : conversation?.lastMessage}
              </p> */}
              <p className="text-[14px] text-[var(--msg-date)] ml-3 relative">
                <span className="absolute top-0 left-[-10px]">&#8226;</span>
                {conversation.lastMessageTime}
              </p>
            </div>
            {conversation?.counter && (
              <div className='absolute top-2 right-2 overflow-hidden'>
                <p className='flex items-center justify-center text-[12px] w-5 h-5 bg-red-500 rounded-full text-white'>{conversation?.counter > 100 ? "99+" : conversation?.counter}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MiddleConversations
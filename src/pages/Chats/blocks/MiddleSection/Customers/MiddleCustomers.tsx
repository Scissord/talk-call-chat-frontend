import { FC, useEffect, useRef } from 'react'
import { useSocketContext, useChats } from '@context'
import { useAppSelector,  } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';
import { ICustomer } from '@interfaces';

const MiddleCustomers: FC = () => {
  const {
    customers,
    customer,
    setCustomer,
    setCustomers,
    page,
    setPage,
    fetchConversation,
    setFile
  } = useChats();

  const user = useAppSelector((state: RootState) => getUser(state));
  const containerRef = useRef<HTMLDivElement>(null);

  const { newCustomer, raiseConversation } = useSocketContext();

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
          setPage((prev: number) => prev + 1);
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
  }, [page]);

  useEffect(() => {
    if(raiseConversation) {
      handleRaiseConversation();
    };
  }, [raiseConversation]);

  useEffect(() => {
    if(newCustomer) {
      handleUpdateCustomerStatus();
    };
  }, [newCustomer]);

  const handleChatClick = (customer: ICustomer) => {
    const conversation = customers.find((c) => {
      if(customer && c.id) {
        return +c.id === +customer?.id
      }
    });
    if (conversation) {
      const updatedConversation = { ...conversation, counter: undefined };

      const newCustomers = customers.map((c) => {
        if(c.id) {
          return +c.id === +customer?.id ? updatedConversation : c
        }
      });

      if(newCustomers) {
        setCustomers(newCustomers);
      };
    };

    setCustomer(customer);
    if(customer?.id) {
      fetchConversation(customer?.id);
    }
    setFile(null);
  };

  const handleUpdateCustomerStatus = () => {
    let newCustomers: ICustomer[] = [];

    const existIndex = customers?.findIndex((c: ICustomer) => c.order_id === newCustomer?.order_id);
    let status;
    if(user){
      status = +user?.role?.status;
    };

    if (existIndex !== -1 && newCustomer) {
      if(status === 100) {
        newCustomers = [
          newCustomer,
          ...customers?.filter((_, index) => index !== existIndex)
        ];
      } else if (status === +newCustomer?.status) {
        newCustomers = [
          newCustomer,
          ...customers?.filter((_, index) => index !== existIndex)
        ];
      } else {
        newCustomers = [
          ...customers?.filter((_, index) => index !== existIndex)
        ];
      };
      setCustomers(newCustomers);
    } else {
      if(newCustomer && status === 100) {
        newCustomers = [
          newCustomer,
          ...customers
        ];
      } else if(newCustomer && status === +newCustomer?.status) {
        newCustomers = [
          newCustomer,
          ...customers
        ];
      };
      setCustomers(newCustomers);
    };
  };

  const handleRaiseConversation = () => {
    let newCustomers: ICustomer[] = [];

    const existIndex = customers?.findIndex((c: ICustomer) => {
      if(c.id) {
        return +c.id === +raiseConversation?.id
      };
    });

    if (existIndex !== -1) {
      if(user?.role.status === +raiseConversation?.status) {
        const existingConversation = customers[existIndex];
        existingConversation.counter = (existingConversation.counter || 0) + (raiseConversation?.counter);
        customers.splice(existIndex, 1);

        newCustomers = [existingConversation, ...customers];
      };
    }

    setCustomers(newCustomers);
  };

  return (
    <div ref={containerRef} className='flex-grow overflow-y-auto'>
      {customers && customers.length > 0 && customers?.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => handleChatClick(conversation)}
          className={`relative select-none
            cursor-pointer flex items-center gap-2 px-5 py-3
          hover:bg-gray-300 dark:hover:bg-[#2d3f65]
            ${customer?.id === conversation.id && 'bg-gray-300 dark:bg-[#2d3f65]'}
          `}
        >
          {customer?.id === conversation.id &&
            <div className='absolute left-0 h-full w-1 bg-[#0086FF]'/>
          }
          <div className="relative inline-block">
            <img
              src={conversation.avatar ? conversation.avatar : 'pics/default_avatar.png'}
              className='border border-slate-300 rounded-full w-10 h-10'
              alt="avatar"
            />
          </div>

          <div className='flex flex-col'>
            <p className={`font-semibold text-[15px] text-black dark:text-white`}>
              {conversation.name}
            </p>
            <div className='flex items-center overflow-hidden gap-1'>
              <p className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[var(--msg-message)] text-[13px]">
                {conversation.order_id}
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

export default MiddleCustomers;

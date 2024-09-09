import axios from 'axios';
import { AuthContext } from 'contexts/auth';
import { ViewContext } from 'contexts/view'
import React, { useContext } from 'react'

const ChatTitle = ({
  fetchConversations, isFavorite, title,
  activeCustomer, setConversations,
  setCurrentPage, setActiveCustomer
}) => {
  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

  const handleAddFavorite = async () => {
    await axios({
      method: 'PATCH',
      url: `/customers/${activeCustomer.id}`,
    })
      .then(() => {
        setConversations([]);
        setCurrentPage(1);
        fetchConversations()
        setActiveCustomer({
          id: null,
          customer_good: "",
          customer_phone: "",
          leadvertex_id: null
        });
      })
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
  };

  return (
    <div className='flex items-center justify-between px-6 py-6 border-b border-slate-300'>
      <div className={`text-[18px] font-semibold ${context.colorMode.theme === 0 ? 'text-black' : 'text-white'}`}>{title}</div>
      <div onClick={() => handleAddFavorite()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={`${isFavorite ? 'red' : 'none'}`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-gray-300 cursor-pointer hover:text-gray-400 hover:font-bold"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
      </div>
    </div>
  )
}

export default ChatTitle
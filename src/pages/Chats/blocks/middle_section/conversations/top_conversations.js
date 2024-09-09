import { ViewContext } from 'contexts/view'
import React, { useContext } from 'react'

const TopConversations = ({ type, setType, setCurrentPage, setConversations }) => {
  const context = useContext(ViewContext);

  const handleChangeType = (t) => {
    setCurrentPage(1);
    if(type !== t) {
      setConversations([]);
    }
    setType(t)
  };

  return (
    <div className='w-full min-h-[6vh] flex items-center select-none border-b border-slate-300'>
      <div
        onClick={() => handleChangeType(0)}
        className={`
          h-full w-1/2 flex items-center
          justify-center cursor-pointer border-r border-slate-300
          ${type === 0 && context.colorMode.theme === 0 && 'bg-gray-300'}
          ${type === 0 && context.colorMode.theme === 1 && 'bg-[#404d69]'}
        `}
      >
        <p
          className={`
            font-semibold text-[13px]
            ${context.colorMode.theme === 0 ? 'text-black' : 'text-white'}
          `}
        >
          Все
        </p>
      </div>
      <div
        onClick={() => handleChangeType(1)}
        className={`
          h-full w-1/2 flex items-center
          justify-center cursor-pointer
          ${type === 1 && context.colorMode.theme === 0 && 'bg-gray-300'}
          ${type === 1 && context.colorMode.theme === 1 && 'bg-[#404d69]'}
        `}
      >
        <p
          className={`
            font-semibold text-[13px]
            ${context.colorMode.theme === 0 ? 'text-black' : 'text-white'}
          `}
        >
          Избранные
        </p>
      </div>
    </div>
  )
}

export default TopConversations
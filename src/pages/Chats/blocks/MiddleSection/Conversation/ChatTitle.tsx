import { FC } from 'react';
import { useChats } from '@context';

const ChatTitle: FC = () => {
  const { customer } = useChats();

  return (
    <div className='flex items-center justify-between px-6 py-6 border-b border-slate-300'>
      <div className={`text-[18px] font-semibold text-black dark:text-white`}>
        {customer?.name + "/" + customer?.order_id}
      </div>
    </div>
  )
}

export default ChatTitle
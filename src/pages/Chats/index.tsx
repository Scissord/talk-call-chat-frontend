import { FC } from 'react';
import { ChatProvider } from '@context';
import MiddleSection from './blocks/MiddleSection';

const Chats: FC = () => {
  return (
    <div className='flex flex-col w-full min-h-[100vh] bg-white dark:bg-indigo-950'>
      <ChatProvider>
        <MiddleSection/>
      </ChatProvider>
    </div>
  );
};

export default Chats;

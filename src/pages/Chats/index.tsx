import { FC } from 'react';
import { ChatProvider } from '@context';
import TopSection from './blocks/TopSection';
import MiddleSection from './blocks/MiddleSection';

const Chats: FC = () => {
  return (
    <div className='flex flex-col w-full min-h-[100vh]'>
      <ChatProvider>
        <TopSection/>
        <MiddleSection/>
      </ChatProvider>
    </div>
  );
};

export default Chats;

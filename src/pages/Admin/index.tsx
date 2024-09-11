import { FC } from 'react';
import TopSection from './blocks/TopSection';
import MiddleSection from './blocks/MiddleSection';

const Admin: FC = () => {
  return (
    <div className='min-w-full min-h-[100vh]'>
      <TopSection/>
      <MiddleSection/>
    </div>
  );
};

export default Admin;

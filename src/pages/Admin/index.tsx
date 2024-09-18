import { FC } from 'react';
import TopSection from './blocks/TopSection';
import MiddleSection from './blocks/MiddleSection';

const Admin: FC = () => {
  return (
    <div className='min-h-[100vh] bg-white'>
      <TopSection/>
      <MiddleSection/>
    </div>
  );
};

export default Admin;

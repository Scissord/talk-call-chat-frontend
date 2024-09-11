import { FC } from 'react';
import Customers from './MiddleSection/Customers';
import Conversation from './MiddleSection/Conversation';
import CustomerInfo from './MiddleSection/CustomerInfo';

const MiddleSection: FC = () => {
  return (
    <div className='flex flex-col sm:flex-row h-[88vh]'>
      <Customers/>
      <Conversation/>
      <CustomerInfo/>
    </div>
  )
}

export default MiddleSection;

import { useChats } from '@context';
import { FC, useState } from 'react'
import { Loader } from '@ui';
import Certificates from './CustomerInfo/Certificates';
// import Tags from './CustomerInfo/Tags';
import Responsible from './CustomerInfo/Responsible';

const ConversationInfo: FC = () => {
  const { customer, setFile, setMessage } = useChats();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className='h-full w-full sm:w-1/4 border-r border-l border-slate-300 overflow-hidden px-4'>
      {customer ? (
        <div className="w-full flex flex-col gap-3 items-center">
          <div className='flex flex-col items-center w-full pt-3'>
            <img
              src={customer?.avatar ? customer?.avatar : 'pics/default_avatar.png'}
              className='h-16 w-16 rounded-full border border-slate-300'
            />
            <p className='text-xl text-black dark:text-white'>
              {customer?.name ? customer?.name : '...'}
            </p>
          </div>
          <div className='flex flex-col gap-2 border-t items-start border-slate-300 w-full px-2 py-2'>
            {loading ? <Loader className='loading-lg'/> : (
              <Certificates
                setFile={setFile}
                setLoading={setLoading}
                setMessage={setMessage}
              />
            )}
          </div>
          {/* <div className='flex flex-col gap-2 items-start border-t border-slate-300 w-full px-2 py-2'>
            <Tags/>
          </div> */}
          <div className='flex flex-col gap-2 items-start border-t border-slate-300 w-full px-2 py-2'>
            <Responsible manager={customer?.manager_name ? customer.manager_name : "Нет"}/>
          </div>
        </div>
      ) : (
        <div className='h-full flex flex-col items-center justify-center'>
          Выберите чат
        </div>
      )}
    </div>
  )
}

export default ConversationInfo
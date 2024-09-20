import { useChats } from '@context';
import { FC, useState } from 'react'
import { Loader } from '@ui';
import Certificates from './CustomerInfo/Certificates';

const ConversationInfo: FC = () => {
  const { customer, setFile, setMessage } = useChats();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className='h-full w-full sm:w-1/4 border-r border-l border-slate-300 overflow-y-auto'>
      {customer ? (
        <div className="flex flex-col items-center py-6">
          <img
            src={customer.avatar ? customer.avatar : 'pics/default_avatar.png'}
            className='h-16 w-16 rounded-full border border-slate-300'
          />
          <div className='flex flex-col gap-2 items-start border-t border-b border-slate-300 w-full px-2 py-4'>
            {loading ? <Loader className='loading-lg'/> : (
              <Certificates
                setFile={setFile}
                setLoading={setLoading}
                setMessage={setMessage}
              />
            )}
          </div>
          {/* <div className='flex flex-col gap-2 items-start border-b border-slate-300 w-full px-2 py-4'>
              <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                text-black dark:text-white
              `}>
                Ответственный: {customer?.manager_id ? customer.manager_id : "Нет"}
              </p>
          </div> */}
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
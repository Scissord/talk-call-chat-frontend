import { useChats } from '@context';
import { FC, useState } from 'react'
import { Loader } from '@ui';

const ConversationInfo: FC = () => {

  const { customer, setFile, setMessage } = useChats();
  const [loading, setLoading] = useState(false);

  const handleSetCert = async (url: string) => {
    setLoading(true);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Image fetch failed');

    const name = url.split('/').pop() || 'cert.jpg';

    const blob = await response.blob();
    const file = new File([blob], name, { type: 'image/jpeg' });
    setMessage("");
    setFile(file);
    setLoading(false);
  };

  return (
    <div className='h-full w-full sm:w-1/4 border-l border-slate-300 overflow-y-auto'>
      {customer ? (
        <div className="flex flex-col gap-6 items-center py-6">
          <img
            src={customer.avatar ? customer.avatar : 'pics/default_avatar.png'}
            className='h-16 w-16 rounded-full border border-slate-300'
          />
          <div className='flex flex-col gap-2 items-start border-t border-b border-slate-300 w-full px-2 py-4'>
            {loading ? <Loader className='loading-lg'/> : (
              <>
                <p
                  className={`
                    text-md cursor-pointer hover:text-gray-300
                    text-black dark:text-white
                  `}
                  onClick={() => handleSetCert('/templates/alco-cert.jpg')}
                >
                  1. AlcoBalance
                </p>
                <p
                  className={`
                    text-md cursor-pointer hover:text-gray-300
                    text-black dark:text-white
                  `}
                  onClick={() => handleSetCert('/templates/body-cert.jpg')}
                >
                  2. BodyBalance
                </p>
                <p
                  className={`
                    text-md cursor-pointer hover:text-gray-300
                    text-black dark:text-white
                  `}
                  onClick={() => handleSetCert('/templates/ero-cert.jpg')}
                >
                  3. EroKing
                </p>
                <p
                  className={`
                    text-md cursor-pointer hover:text-gray-300
                    text-black dark:text-white
                  `}
                  onClick={() => handleSetCert('/templates/flex-cert.jpg')}
                >
                  4. FlexBalance
                </p>
                <p
                  className={`
                    text-md cursor-pointer hover:text-gray-300
                  text-black dark:text-white
                  `}
                  onClick={() => handleSetCert('/templates/libido-cert.jpg')}
                >
                  4. LibidoBalance
                </p>
                <p
                  className={`
                    text-md cursor-pointer hover:text-gray-300
                    text-black dark:text-white
                  `}
                  onClick={() => handleSetCert('/templates/man-cert.jpg')}
                >
                  4. ManBalance
                </p>
              </>
            )}
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
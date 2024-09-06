import { ViewContext } from 'contexts/view'
import React, { useContext } from 'react'

const ConversationInfo = ({ activeCustomer, setMessage, setFile }) => {
  const context = useContext(ViewContext);

  const handleSetCert = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Image fetch failed');

    // '/templates/alco-cert.jpg'
    const name = url.split('/').pop();;

    const blob = await response.blob();
    const file = new File([blob], name, { type: 'image/jpeg' });
    setMessage("");
    setFile(file);
  };

  return (
    <div className='h-full w-full sm:w-1/4 border-l border-slate-300 overflow-y-auto'>
      {activeCustomer.id ? (
        <div className="flex flex-col gap-6 items-center py-6">
          <img
            src={activeCustomer.customer_photo ?? 'assets/avatar-default.svg'}
            className='h-16 w-16 rounded-full border border-slate-300'
          />

          <div className='flex flex-col gap-2 items-start border-t border-b w-full px-2 py-4'>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => handleSetCert('/templates/alco-cert.jpg')}
            >
              1. AlcoBalance
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => handleSetCert('/templates/body-cert.jpg')}
            >
              2. BodyBalance
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => handleSetCert('/templates/ero-cert.jpg')}
            >
              3. EroKing
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => handleSetCert('/templates/flex-cert.jpg')}
            >
              4. FlexBalance
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => handleSetCert('/templates/libido-cert.jpg')}
            >
              4. LibidoBalance
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => handleSetCert('/templates/man-cert.jpg')}
            >
              4. ManBalance
            </p>
          </div>
        </div>
      ) : (
        <div className='h-full flex flex-col items-center justify-center'>
          <img src='assets/select_emoji.png'/>
        </div>
      )}
    </div>
  )
}

export default ConversationInfo
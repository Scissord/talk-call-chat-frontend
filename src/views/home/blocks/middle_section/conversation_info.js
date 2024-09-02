import { ViewContext } from 'contexts/view'
import React, { useContext } from 'react'
import { AudioRecorder } from 'components/lib';

const ConversationInfo = ({ activeCustomer, setMessage, setFile }) => {
  const context = useContext(ViewContext);

  const handleSetCert = async () => {
    const response = await fetch('/templates/certificate.jpg');
    if (!response.ok) throw new Error('Image fetch failed');

    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
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
                text-2xl font-bold
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
            >
              Шаблоны
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => setMessage('Сәлеметсізбе')}
            >
              1. Сәлеметсізбе
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => setMessage('Жақсы рахмет')}
            >
              2. Жақсы рахмет
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={() => setMessage('Жоқ')}
            >
              3. Жоқ
            </p>
            <p
              className={`
                text-md cursor-pointer hover:text-gray-300
                ${context.colorMode.theme === 0 && 'text-black'}
                ${context.colorMode.theme === 1 && 'text-white'}
              `}
              onClick={handleSetCert}
            >
              3. Cert
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
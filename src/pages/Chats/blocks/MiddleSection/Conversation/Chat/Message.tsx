import { FC, Fragment } from 'react';
import { Audio, Search } from '@ui';
import { IMessage } from '@interfaces';
import { useChats } from '@context';
import Send from './Send';
import ReactDOM from "react-dom";
import '../scroll.css';

type MessageProps = {
  message: IMessage;
  isActive: boolean;
  onContextMenu: (event: any) => void;
  replyMessage: (message_id: string, customer_id: string) => Promise<void>;
  onCloseMenu: () => void;
  menuPosition: { x: number; y: number };
};

const Message: FC<MessageProps> = (props) => {
  const {
    message, isActive,
    onContextMenu, onCloseMenu,
    replyMessage, menuPosition
  } = props;
  const { customers, search, setSearch, setPage } = useChats();

  const openGoogleMaps = (lat: string, lon: string) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    window.open(url, '_blank');
  };

  const handleSearch = (text: string) => {
    setSearch(text)
    setPage(1);
  };

  const renderContextMenu = () => {
    return (
      <div
        className="fixed z-10 bg-gray-300 border shadow-lg p-2 h-40 scroll"
        style={{
          top: `${menuPosition.y}px`,
          left: `${menuPosition.x}px`,
        }}
      >
        <div className='flex items-center justify-between gap-3'>
          <Search
            value={search}
            setValue={(text: string) => handleSearch(text)}
            placeholder="Поиск..."
            loading={false}
            className="border w-full text-black dark:text-white"
          />
          <button
            onClick={() => onCloseMenu()}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>
        <br />
        {customers &&
          customers.length > 0 &&
          customers.map((customer) => (
            <ul
              key={customer?.id}
              className=" flex items-center justify-between p-1 border-t border-b text-black dark:text-white"
            >
              <li>{customer?.name}</li>
              <Send onClick={() => replyMessage(message?.id, customer?.id)} />
            </ul>
          ))}
      </div>
    );
  };

  return (
    <div
      className={`
        relative flex items-end gap-2
        ${!message.incoming ? 'flex-row-reverse' : 'flex-row'}
      `}
    >
      <div className='flex flex-col items-center gap-1'>
        <img
          src={!message.incoming ? 'pics/default_avatar.png' : message?.avatar ? message?.avatar : 'pics/default_avatar.png'}
          className='h-10 w-10 rounded-full border border-slate-300'
          alt='avatar'
        />
        {!message.incoming && <p className='text-[12px]'>
          {message?.manager_name ? message?.manager_name?.slice(0, 5) : "ИИ"}
        </p>}
      </div>
      <div
        className={`
          overflow-hidden inline-block relative min-w-[10px] max-w-[50%]
          ${message.incoming && 'rounded-r-xl rounded-tl-xl bg-gray-100 text-black px-3 py-3'}
          ${!message.incoming && 'rounded-l-xl rounded-tr-xl bg-[#646dff] text-white px-3 py-3'}
        `}
        onContextMenu={onContextMenu}
      >
        {message?.quoted_message && (
          <p className='bg-slate-100 px-2 py-1 border-b border-black'>{message?.quoted_message}</p>
        )}
        <p>{message?.text}</p>
        {message?.attachments?.map((attachment) => (
          <Fragment key={attachment.id}>
            {attachment?.contentType?.includes('image') && <img
              src={attachment.link}
              alt={attachment.link}
              className='w-fit min-h-16 max-h-40 rounded-lg'
            />}

            {attachment.contentType === 'application/pdf' && <div
              className="flex items-center gap-2"
            >
              <img className="w-8 h-8" src="assets/doc.png"/>
              <a
                href={attachment.link}
                target="_blank"
                className='hover:text-blue-500'
              >
                Скачать
              </a>
            </div>}

            {attachment?.contentType?.includes('audio') && <Audio
              src={attachment.link}
            />}

            {!attachment.contentType && <img
              src={`data:image/jpeg;base64,${attachment.thumb}`}
              alt={attachment.link}
              onClick={() => openGoogleMaps(attachment.lat, attachment.lon)}
              className='rounded-lg cursor-pointer'
            />}

            {attachment?.contentType?.includes('video') && <video
              src={attachment.link}
              className='rounded-lg cursor-pointer'
              controls
            />}
          </Fragment>
        ))}
        <div className={`
          absolute text-[8px] bottom-0
          ${message.incoming && 'left-1 text-gray-400'}
          ${!message.incoming && 'right-1 text-gray-300'}
        `}>
          {message?.created_at}
        </div>
      </div>
      {isActive && ReactDOM.createPortal(renderContextMenu(), document.body)}
    </div>
  )
}

export default Message;

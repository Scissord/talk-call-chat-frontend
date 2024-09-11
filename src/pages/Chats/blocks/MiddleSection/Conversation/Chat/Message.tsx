import { FC, Fragment } from 'react';
import { Audio } from '@ui';
import { IMessage } from '@interfaces';

type MessageProps = {
  message: IMessage;
};

const Message: FC<MessageProps> = ({ message }) => {

  const openGoogleMaps = (lat: string, lon: string) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`
        relative flex items-end gap-2
        ${!message.incoming ? 'flex-row-reverse' : 'flex-row'}
      `}
    >
      <img
        src={message.avatar ? message.avatar :  'pics/default_avatar.png'}
        className='h-10 w-10 rounded-full border border-slate-300'
        alt='avatar'
      />
      <div
        className={`
          inline-block min-w-[10px] max-w-[50%]
          ${message.incoming && !message.attachment_url && 'rounded-r-xl rounded-tl-xl bg-gray-200 text-black px-3 py-3'}
          ${!message.incoming && !message.attachment_url && 'rounded-l-xl rounded-tr-xl bg-[#0086FF] text-white px-3 py-3'}
        `}
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

      </div>
    </div>
  )
}

export default Message;

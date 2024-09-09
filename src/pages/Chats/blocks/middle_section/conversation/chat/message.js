import { Fragment } from 'react';
import { ChatAudio } from 'components/lib';

const Message = (props) => {
  const { message, openGoogleMaps } = props;

  return (
    <div
      className={`
        relative flex items-end gap-2
        ${!message.incoming ? 'flex-row-reverse' : 'flex-row'}
      `}
    >
      <img src={message.avatar ?? 'assets/avatar-default.svg'} alt='avatar' className='h-10 w-10 rounded-full border border-slate-300'/>
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
                alt={message.url}
                target="_blank"
                className='hover:text-blue-500'
              >
                Скачать
              </a>
            </div>}

            {attachment?.contentType?.includes('audio') && <ChatAudio
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
              alt={attachment.link}
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

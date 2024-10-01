import { FC } from 'react'
import { ICard } from '@interfaces';
import { Draggable } from '@hello-pangea/dnd';
import { useAppSelector, useNavigate } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';
import { useSocketContext } from '@context';

type CardProps = {
  card: ICard,
  index: number;
};

const css = {
  container: `
    select-none p-2 m-2 bg-card dark:bg-dcard
    shadow-lg rounded-lg text-[13px] text-black
    dark:text-white relative z-10 overflow-hidden
    flex items-center gap-3 border border-slate-200
    dark:border-indigo-900
  `,
  delete: `
    absolute top-1 right-2 hover:cursor-pointer
  `,
};

const Card: FC<CardProps> = (props) => {
  const { card, index } = props;
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => getUser(state));
  const { blockIds } = useSocketContext();

  return (
    <Draggable
      index={index}
      draggableId={card?.id}
      isDragDisabled={blockIds.includes(card?.id)}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
            zIndex: 10
          }}
          onClick={() => {
            if (user) {
              switch (+user.id) {
                case 7:
                  navigate("/chats", { state: { customer: card } });
                  break;
                case 43:
                  navigate("/chats", { state: { customer: card } });
                  break;
                case 45:
                  navigate("/chats", { state: { customer: card } });
                  break;
                default:
                  if (card?.manager_id === user?.id) {
                    navigate("/chats", { state: { customer: card } });
                  }
                  break;
              };
            };
          }}
          className={css.container}
        >
          <img
            src={card?.avatar ? card?.avatar : 'pics/default_avatar.png'}
            className='w-10 h-10 rounded-full'
            alt="avatar"
          />
          <div className='flex flex-col w-full text-xs'>
            <div className='flex items-center justify-between w-full'>
              <p>{card?.order_id}</p>
              <p>{card?.time}</p>
            </div>
            <div className='flex items-center justify-between w-full'>
              <p className='font-bold'>
                {card?.name?.length > 15? card?.name?.slice(0, 14) : card?.name}
              </p>
              <div className='ml-auto'>
                <img
                  src={card?.path}
                  className='w-6'
                  alt="product"
                />
              </div>
            </div>
            <div className='flex items-center mt-2'>
              <img
                src={'pics/whatsapp_logo.webp'}
                className='w-4 rounded-full'
                alt="whatsapp"
              />
              {card?.text && <p className='rounded'>
                {card?.text.length > 10 ? card.text.slice(0, 10) + '...' : card?.text}
              </p>}
              {card?.counter !== 0 && <p className='ml-auto text-[8px] w-3 h-3 bg-[#646dff] rounded-full text-white flex items-center justify-center'>
                {card?.counter}
              </p>}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Card
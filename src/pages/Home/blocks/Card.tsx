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
    shadow-md rounded-lg text-[13px] text-black
    dark:text-white relative z-10 overflow-hidden
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
          <div className='flex items-center justify-between'>
            <p>{card?.name}</p>
            <img
              src={card?.avatar ? card?.avatar : 'pics/default_avatar.png'}
              className='w-4 h-4 rounded-full'
              alt="avatar"
            />
          </div>
          <p>{card?.order_id}</p>
          {card?.text && <p className='bg-green-800 p-1 w-full'>{card?.text}</p>}
        </div>
      )}
    </Draggable>
  )
}

export default Card
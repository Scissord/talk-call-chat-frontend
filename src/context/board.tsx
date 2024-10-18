import axios from '@axios';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  KeyboardEvent
} from 'react';
import { useSocketContext, useViewContext } from '@context';
import { DragStart, DropResult } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';
import { IBoard, ICard } from '@interfaces';

interface BoardContextType {
  board: IBoard;
  onDragEnd: (result: DropResult) => void;
  onDragStart: (result: DragStart) => void,
  loading: boolean;
  search: string;
  setSearch: (search: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  deleteCard: (card_id: string, manager_id: string) => void;
  getBoard: () => void;
  toggleFixCard: (card_id: string) => void;
};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const { socket, newCardSpot, newMessage } = useSocketContext();
  const navigate = useNavigate();
  const context = useViewContext();
  const user = useAppSelector((state: RootState) => getUser(state));

  const [board, setBoard] = useState<IBoard>({
    columns: {},
    cards: {},
  });

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    if (newCardSpot?.destination?.droppableId) {
      const columns = {...board.columns}
      const cards = {...board.cards};

      const manager_id = columns[newCardSpot?.destination?.droppableId]?.manager_id

      if(manager_id) {
        cards[newCardSpot.customer_id].manager_id = manager_id;
      }

      setBoard({
        ...board,
        cards
      });
    }
  }, [newCardSpot, board.columns]);

  useEffect(() => {
    if (newMessage?.customer_id && newMessage?.text) {
      handleRaiseCustomer(newMessage.customer_id, newMessage.text);
    }
  }, [newMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputValue = (e.target as HTMLInputElement).value;

      if (board?.cards) {
        const card = Object.values(board?.cards).find(card => +card.order_id === +inputValue);
        if(card) {
          navigate("/chats", { state: { customer: card } });
        } else {
          context?.notification.show('Заказ не найден!', 'error');
        };
      } else {
        context?.notification.show('Заказ не найден!', 'error');
      };
    };
  };

  const getBoard = useCallback(async () => {
    setLoading(true);
    await axios({
      method: 'GET',
      url: '/board',
    }).then((res) => {
      setLoading(false);
      setBoard(res.data);
    });
  }, []);

  const deleteCard = useCallback(async (card_id: string) => {
    const confirm = window.confirm('Вы уверены?')
    if(!confirm) return;
    await axios({
      method: 'DELETE',
      url: `/cards/${card_id}`,
    }).then(() => {
      const cards = {...board.cards};
      delete cards[card_id];

      setBoard({
        ...board,
        cards
      });
    });
  }, [board.cards]);

  const toggleFixCard = useCallback(async (card_id: string) => {
    const confirm = window.confirm('Вы уверены?')
    if(!confirm) return;

    await axios({
      method: 'PATCH',
      url: `/cards/${card_id}/toggle_fix`,
    }).then(() => {
      const cards = {...board.cards};
      cards[card_id].isfixed = !cards[card_id].isfixed;

      setBoard({
        ...board,
        cards
      });
    })
  }, [board.cards]);

  const onDragStart = useCallback((result: DragStart) => {
    const { draggableId } = result;

    if (user && socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "onDragStart",
        customer_id: draggableId,
        user_id: user.id,
      });

      socket.send(message);
      console.log(`Message sent: ${message}`);
    } else {
      console.log('WebSocket is not connected');
    }
  }, [socket, user]);

  const onDragEnd = useCallback(async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (user && socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: "onDragEnd",
        customer_id: draggableId,
        user_id: user.id,
        destination,
        source,
      });

      socket.send(message);
      console.log(`Message sent: ${message}`);
    } else {
      console.log('WebSocket is not connected');
    }

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const columns = {...board.columns}
    const cards = {...board.cards};
    const newManagerId = columns[destination.droppableId].manager_id;
    cards[draggableId].manager_id = newManagerId;

    setBoard({
      ...board,
      cards
    });

    await axios.patch(`/cards/${draggableId}/move`, {
      manager_id: newManagerId
    });

  }, [board, user, socket]);

  const handleRaiseCustomer = useCallback((customer_id: string, text: string) => {
    const existingCard = (board.cards as { [key: string]: ICard })[customer_id];
    const newCard = {
      ...existingCard,
      text,
      counter: existingCard?.counter ? existingCard.counter + 1 : 1,
      last_message_date: 'Новая дата',
    };

    setBoard((prevBoard) => ({
      ...prevBoard,
      cards: {
        ...prevBoard.cards,
        [customer_id]: newCard,
      },
    }));
  }, [board]);

  return (
    <BoardContext.Provider
      value={{
        board,
        onDragEnd,
        onDragStart,
        loading,
        search,
        setSearch,
        handleKeyDown,
        deleteCard,
        getBoard,
        toggleFixCard
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useChats must be used within a ChatProvider');
  }
  return context;
};

import { FC, useContext } from 'react'
import { ViewContext } from '@context';
// import AddModal from './AddModal';

const FloatingButton: FC = () => {
  const context = useContext(ViewContext);

  const handleAddConversation = () => {
    // context?.modal.show({
    //   title: 'Написать первым',
    //   children: <AddModal setConversations={setConversations}/>
    // })
  };

  return (
    <div
      onClick={() => handleAddConversation()}
      className='fixed bottom-3 left-3 bg-[#0086FF] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-xl'
    >
      {/* <Icon image="plus" color="white" size={28}/> */}
      +
    </div>
  )
}

export default FloatingButton
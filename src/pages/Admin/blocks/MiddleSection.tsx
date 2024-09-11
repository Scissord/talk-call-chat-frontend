import axios from '@axios';
import { useEffect, useState } from 'react'
import TopCards from './MiddleSection/TopCards';
import MiddleCards from './MiddleSection/MiddleCards';
import BottomCards from './MiddleSection/BottomCards';
import { useViewContext } from '@context';

const MiddleSection = () => {
  const context = useViewContext();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    await axios({
      method: 'GET',
      url: `/users`,
    })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch(() => {
        context?.notification.show('Ошибка при загруке пользователей', "error")
      })
  };

  return (
    <div className='h-[86vh] w-full'>
      <TopCards users={users} fetchUsers={fetchUsers}/>
      <MiddleCards/>
      <BottomCards/>
    </div>
  )
}

export default MiddleSection
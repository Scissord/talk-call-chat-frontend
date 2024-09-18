import axios from '@axios';
import { useEffect, useState } from 'react'
import { useViewContext } from '@context';
import Cards from './MiddleSection/Cards';

const MiddleSection = () => {
  const context = useViewContext();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    await axios({
      method: 'GET',
      url: `/admin`,
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
      <Cards users={users} fetchUsers={fetchUsers}/>
    </div>
  )
}

export default MiddleSection;

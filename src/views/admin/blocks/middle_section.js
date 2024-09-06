import axios from 'axios';
import { AuthContext } from 'contexts/auth';
import { useContext, useEffect, useState } from 'react'
import { ViewContext } from 'contexts/view';
import TopCards from './middle_section/top_cards';
import MiddleCards from './middle_section/middle_cards';
import BottomCards from './middle_section/bottom_cards';

const MiddleSection = () => {
  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

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
      .catch((err) => context.notification.show(err.response.data.detail, "error"))
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
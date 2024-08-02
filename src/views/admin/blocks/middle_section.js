import { AuthContext } from 'contexts/auth';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TopCards from './top_cards';
import MiddleCards from './middle_cards';
import BottomCards from './bottom_cards';
import axios from 'axios';
import { ViewContext } from 'contexts/view';

const MiddleSection = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const context = useContext(ViewContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    await axios({
      method: 'GET',
      url: `v1/get_managers`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      }
    })
      .then((res) => {
        const mappedUsers = res.data.managers.map(manager => ({
          ...manager,
          id: manager.manager_id,
          name: manager.login
        }));
        setUsers(mappedUsers);
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
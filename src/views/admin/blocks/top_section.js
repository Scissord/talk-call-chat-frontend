import { AuthContext } from 'contexts/auth';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const TopSection = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <div className='h-[14vh] flex items-center gap-12 px-24 bg-white'>
      <div
        className='flex items-center justify-center h-8 w-8 p-2 cursor-pointer text-white rounded-lg select-none bg-gray-900'
        onClick={() => navigate(-1)}
      >
        {"<"}
      </div>

      <div className='flex items-center gap-3'>
        <p className='text-[24px] font-bold'>#ID:</p>
        <p className='text-[20px] font-semibold'>{auth.user.id}</p>
      </div>

      <div className='flex items-center gap-3'>
        <p className='text-[24px] font-bold'>Login:</p>
        <p className='text-[20px] font-semibold'>{auth.user.name}</p>
      </div>

      <div className='flex items-center gap-3'>
        <p className='text-[24px] font-bold'>Role:</p>
        <p className='text-[20px] font-semibold'>{auth.user.role.label}</p>
      </div>
    </div>
  )
}

export default TopSection
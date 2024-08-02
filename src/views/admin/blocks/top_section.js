import { AuthContext } from 'contexts/auth';
import React, { useContext } from 'react'

const TopSection = () => {
  const auth = useContext(AuthContext);

  return (
    <div className='h-[14vh] flex items-center gap-12 px-24 bg-white'>
      <div className='flex items-center gap-3'>
        <p className='text-[24px] font-bold'>#ID:</p>
        <p className='text-[20px] font-semibold'>{auth.user.id}</p>
      </div>

      <div className='flex items-center gap-3'>
        <p className='text-[24px] font-bold'>Login:</p>
        <p className='text-[20px] font-semibold'>{auth.user.login}</p>
      </div>

      <div className='flex items-center gap-3'>
        <p className='text-[24px] font-bold'>Role:</p>
        <p className='text-[20px] font-semibold'>{auth.user.role}</p>
      </div>
    </div>
  )
}

export default TopSection
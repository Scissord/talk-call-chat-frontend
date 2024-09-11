import { FC } from "react"

const TopCustomers: FC = () => {
  return (
    <div className='w-full min-h-[6vh] flex items-center select-none border-b border-slate-300'>
      <div
        className={`
          h-full w-full flex items-center
          justify-center cursor-pointer border-r border-slate-300
          bg-gray-300 dark:bg-[#404d69]
        `}
      >
        <p
          className={'font-semibold text-[13px] text-black dark:text-white'}
        >
          Чаты
        </p>
      </div>
    </div>
  )
}

export default TopCustomers;

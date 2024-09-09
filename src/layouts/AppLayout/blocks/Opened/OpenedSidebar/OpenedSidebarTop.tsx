import { FC } from 'react'
import { toggleSidebar } from "@store/reducers/sidebarSlice";
import { motion, Variants } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@hooks';
import { IconArrowLeftCircle } from '@icons';
import { selectTheme } from '@store/reducers/themeSlice';

type OpenedSidebarTopProps = {
  variants: Variants;
};

const css = {
  motion: `
    w-full flex items-center justify-between px-4
  `,
  title: `
    flex flex-col font-bold text-md
    text-center text-black dark:text-white
  `,
  icon: `
    flex items-center justify-center
    hover:rounded-lg p-2 cursor-pointer
    hover:bg-gray-200 dark:hover:bg-gray-700
    transition-transform duration-200
    ease-in-out transform active:scale-95
  `,
};

const OpenedSidebarTop: FC<OpenedSidebarTopProps> = ({ variants }) => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay: 0.1 }}
      className={css.motion}
      // whileTap={{ scale: 0.95 }}
    >
      <p
        className={css.title}
      >
        <img src="pics/logo.png" className='w-20' alt="logo"/>
      </p>

      <div
        className={css.icon}
        onClick={() => dispatch(toggleSidebar())}
      >
        <IconArrowLeftCircle fill={theme === 'light' ? 'black' : 'white'}/>
      </div>
    </motion.div>
  )
}

export default OpenedSidebarTop
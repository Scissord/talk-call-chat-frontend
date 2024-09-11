import { FC } from 'react'
import { useAppSelector, useNavigate } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';

const css = {
  container: `
    h-[14vh] flex items-center gap-12
    px-24 bg-white dark:bg-dbg text-black
    dark:text-white
  `,
  button: `
    flex items-center justify-center h-8
    w-8 p-2 cursor-pointer text-white
    dark:text-black rounded-lg select-none
    bg-gray-900 dark:bg-white
  `,
  wrapper: `
    flex items-center gap-3
  `,
  title: `
    text-[24px] font-bold
  `,
  label: `
    text-[20px] font-semibold
  `,
};

const TopSection: FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => getUser(state));

  return (
    <div className={css.container}>
      <div
        className={css.button}
        onClick={() => navigate(-1)}
      >
        {"<"}
      </div>

      <div className={css.wrapper}>
        <p className={css.title}>#ID:</p>
        <p className={css.label}>{user?.id}</p>
      </div>

      <div className={css.wrapper}>
        <p className={css.title}>Login:</p>
        <p className={css.label}>{user?.name}</p>
      </div>

      <div className={css.wrapper}>
        <p className={css.title}>Role:</p>
        <p className={css.label}>{user?.role.label}</p>
      </div>
    </div>
  )
}

export default TopSection
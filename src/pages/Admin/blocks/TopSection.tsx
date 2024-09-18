import { FC } from 'react'
import { useAppSelector } from '@hooks';
import { RootState } from '@store/index';
import { getUser } from '@store/reducers/authSlice';

const css = {
  container: `
    h-[14vh] flex items-center gap-12
    px-24 bg-white dark:bg-dbg text-black
    dark:text-white
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
  const user = useAppSelector((state: RootState) => getUser(state));

  return (
    <div className={css.container}>
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
import { useAppSelector } from '@hooks';
import { selectTheme } from '@store/reducers/themeSlice';

export function IconLock(props: any) {
  const theme = useAppSelector(selectTheme);

  return (
    <svg
      viewBox="0 0 24 24"
      fill={theme === 'dark' ? 'white' : '#000'}
      height="1.4em"
      width="1.4em"
      cursor="pointer"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M18 8h2a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h2V7a6 6 0 1112 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 10-8 0v1h8z" />
    </svg>
  );
}

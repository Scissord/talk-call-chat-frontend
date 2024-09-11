import { useAppSelector } from "@hooks";
import {
  IconAdmin,
  IconChat,
  IconFunnel,
} from "@icons";
import { RootState } from "@store/index";
import { getUser } from "@store/reducers/authSlice";

export const useSidebarUrls  = () => {
  const user = useAppSelector((state: RootState) => getUser(state));

  let sidebar_urls = [
    {
      icon: <IconFunnel />,
      label: 'Воронка',
      path: '/'
    },
    {
      icon: <IconChat />,
      label: 'Мои чаты',
      path: '/chats'
    },
  ];

  if (user && (+user.role.id === 7 || +user.role.id === 5 || +user.role.id === 6)) {
    sidebar_urls.push({
      icon: <IconAdmin />,
      label: 'Админ панель',
      path: '/admin'
    });
  }

  return sidebar_urls;
};

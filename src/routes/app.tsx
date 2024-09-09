import { lazy } from 'react';
import { CW } from '@components';
import { IRoute } from '@interfaces';

const HomePage = lazy(() => import('@pages/Home'));
const CardPage = lazy(() => import('@pages/Card'));
const UserPage = lazy(() => import('@pages/User'));

const AppRoutes: IRoute[] = [
  {
		path: "/",
		element: CW(HomePage),
		layout: "app",
		title: "Talk&Call",
	},
  {
		path: "/cards/:id",
		element: CW(CardPage),
		layout: "app",
		title: "Deal",
	},
  {
    path: "/users/:id",
		element: CW(UserPage),
		layout: "app",
		title: "User",
  },
];

export default AppRoutes;

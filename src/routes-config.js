import { Navigate } from 'react-router-dom';
import Main from "./app/main";
import Basket from "./app/basket";
import ItemPage from './app/item-page';

export const routesConfig = [
  {
    path: '/',
    element: <Main/>
  },
  {
    path: '/item/:id',
    element: <ItemPage/>
  },
  // {
  //   path: AppRoutes.Main,
  //   element: <Root />,
  //   children: [
  //     {
  //       element: <GlobalHistory />,
  //     },
  //     {
  //       path: AppRoutes.Main,
  //       element: <Navigate to={AppRoutes.Books} />,
  //     },
  //     {
  //       index: true,
  //       path: AppRoutes.Flights,
  //       element: <Flights />,
  //     },
  //     {
  //       path: `${AppRoutes.Flight}/:id`,
  //       element: <Flight />,
  //     },
  //     {
  //       index: true,
  //       path: AppRoutes.Books,
  //       element: <Books />,
  //     },
  //     {
  //       index: true,
  //       path: `${AppRoutes.Book}/:id`,
  //       element: <BookPage />,
  //     },
  //   ],
  // },
];

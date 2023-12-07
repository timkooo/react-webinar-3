import Main from "./app/main";
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
  {
    path: '/items/:pageNumber',
    element: <Main/>
  }
];

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from '../routes-config';


export const router = createBrowserRouter(routesConfig);

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return <RouterProvider router={ router }/>;
}

export default App;

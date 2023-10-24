import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Login,
} from './pages';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

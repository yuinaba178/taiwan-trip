import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Itinerary from '../pages/Itinerary';
import Tasks from '../pages/Tasks';
import Expenses from '../pages/Expenses';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'itinerary', element: <Itinerary /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'expenses', element: <Expenses /> },
    ],
  },
]);

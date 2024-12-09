import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import ErrorPage from '../components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
                // loader: () => fetch('/airports.json'),
            },
            {
                path: '/flight-search',
                element: <Search />,
            }
        ]
    }
]);

export default router;
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
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
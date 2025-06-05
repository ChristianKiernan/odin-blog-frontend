import Login from './auth/Login';
import Register from './auth/Register';
import Home from './pages/Home';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './pages/CreatePost'; 

const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'create',
        element: <CreatePost />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

export default routes;
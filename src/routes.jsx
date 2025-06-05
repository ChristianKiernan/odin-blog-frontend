import App from './App';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
];

export default routes;



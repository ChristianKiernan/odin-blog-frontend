import App from "./App";
import Login from "./auth/Login";
import Register from "./auth/Register";
// import PostList from "./pages/PostList";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
    //   { index: true, element: <PostList /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ],
  },
];

export default routes;


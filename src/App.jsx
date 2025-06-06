import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './auth/Login';
import Register from './auth/Register';

export default function App() {
  return (
    <Routes>
      {/* 
        All routes under “/” (Home, CreatePost) require a logged-in user. 
        If no user, ProtectedRoute will redirect to /login. 
      */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* index => renders on “/” */}
        <Route index element={<Home />} />
        {/* “/create” => renders CreatePost */}
        <Route path="create" element={<CreatePost />} />
      </Route>

      {/* Public routes (no auth required) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Fallback: any other path redirects to “/” */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

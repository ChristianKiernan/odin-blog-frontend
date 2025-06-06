// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      {/* Non-clickable site title */}
      <span className="text-xl font-bold text-blue-600">Odin Blog</span>

      <ul className="flex space-x-4 items-center">
        {user ? (
          <>
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                New Post
              </Link>
            </li>
            <li>
              <Link
                to="/saved"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Saved Posts
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

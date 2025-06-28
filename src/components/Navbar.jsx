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
    <nav className="bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between">
      <span className="text-2xl font-extrabold text-white">
        Odin Blog
      </span>
      <ul className="flex space-x-4 items-center">
        {user ? (
          <>
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition font-semibold text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/create" className="text-gray-300 hover:text-white transition font-semibold text-lg">
                New Post
              </Link>
            </li>
            <li>
              <Link to="/saved" className="text-gray-300 hover:text-white transition font-semibold text-lg">
                Saved Posts
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition font-semibold text-lg"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-gray-300 hover:text-white transition font-semibold text-lg">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-300 hover:text-white transition font-semibold text-lg">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}


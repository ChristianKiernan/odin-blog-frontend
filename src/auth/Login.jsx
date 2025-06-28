// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser(form);
      login({
        token: res.data.token,
        id: res.data.user.id,
        username: res.data.user.username,
      });

	  //Redirect upon successful submission
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8">
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Login
        </h2>

        {error && <div className="mb-6 text-red-600">{error}</div>}

		{/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            className="border border-gray-400 rounded-md w-full p-4 mb-4
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="border border-gray-400 rounded-md w-full p-4 mb-6
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold w-full py-3 rounded-md
                       transition-colors text-lg"
          >
            Login
          </button>
        </form>
		
		{/* Easy access to register functionality if needed */}
        <p className="mt-4 text-center text-gray-500">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

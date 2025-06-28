import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

export default function Register() {

  // Local state for form inputs and error messages
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(form);

      // Redirect upon successful submission
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8">
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Register
        </h2>

        {error && <div className="mb-6 text-red-600">{error}</div>}

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            className="border border-gray-400 rounded-md w-full p-4
                       focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="border border-gray-400 rounded-md w-full p-4
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
            Register
          </button>
        </form>

        {/* Easy access to login functionality if user account alredy exists */}
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}


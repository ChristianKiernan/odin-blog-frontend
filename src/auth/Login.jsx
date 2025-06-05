import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import CenteredCard from '../components/CenteredCard';

export default function Login() {
	const [form, setForm] = useState({ username: '', password: '' });
	const [error, setError] = useState('');
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const res = await loginUser(form);
			login({ token: res.data.token, user: res.data.user });
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed.');
		}
	};

	return (
		<CenteredCard>
			<h2>Login</h2>
			{error && <div className='alert alert-danger'>{error}</div>}
			<form onSubmit={handleSubmit}>
				<input
					name='username'
					type='text'
					onChange={handleChange}
					className='form-control mb-2'
					placeholder='Username'
					required
				/>
				<input
					name='password'
					type='password'
					onChange={handleChange}
					className='form-control mb-2'
					placeholder='Password'
					required
				/>
				<button className='btn btn-primary w-100'>Login</button>
			</form>
			<p className='mt-3 text-center'>
				Don’t have an account? <Link to='/register'>Register here</Link>
			</p>
		</CenteredCard>
	);
}

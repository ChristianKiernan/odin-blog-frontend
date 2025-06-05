import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';

export default function Login() {
	const [form, setForm] = useState({ email: '', password: '' });
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
		<div className='container mt-5'>
			<h2>Login</h2>
			{error && <div className='alert alert-danger'>{error}</div>}
			<form onSubmit={handleSubmit}>
				<input
					name='email'
					type='email'
					onChange={handleChange}
					className='form-control mb-2'
					placeholder='Email'
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
				<button className='btn btn-primary'>Login</button>
			</form>
		</div>
	);
}

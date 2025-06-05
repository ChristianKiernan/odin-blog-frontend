import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
	const [form, setForm] = useState({ username: '', email: '', password: '' });
	const navigate = useNavigate();
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			await axios.post('http://localhost:5000/users/register', form);
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.message || 'Registration failed.');
		}
	};

	return (
		<div className='container mt-5'>
			<h2>Register</h2>
			{error && <div className='alert alert-danger'>{error}</div>}
			<form onSubmit={handleSubmit}>
				<input
					name='username'
					onChange={handleChange}
					className='form-control mb-2'
					placeholder='Username'
					required
				/>
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
				<button className='btn btn-primary'>Register</button>
			</form>
		</div>
	);
}

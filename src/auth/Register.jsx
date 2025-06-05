import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CenteredCard from '../components/CenteredCard';
import { registerUser } from '../api/auth';

export default function Register() {
	const [form, setForm] = useState({ username: '', email: '', password: '' });
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			await registerUser(form);
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.message || 'Registration failed.');
		}
	};

	return (
		<CenteredCard>
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
				<button className='btn btn-primary w-100'>Register</button>
			</form>
			<p className='mt-3 text-center'>
				Already have an account? <Link to='/login'>Login here</Link>
			</p>
		</CenteredCard>
	);
}

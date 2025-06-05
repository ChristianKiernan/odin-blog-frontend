import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../api/posts';

export default function CreatePost() {
	const [form, setForm] = useState({ title: '', content: '' });
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			await createPost(form, user?.token);
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to create post.');
		}
	};

	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ minHeight: '80vh' }}
		>
			<div
				className='card p-4'
				style={{ width: '100%', maxWidth: '600px' }}
			>
				<h2>Create a New Post</h2>
				{error && <div className='alert alert-danger'>{error}</div>}
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						name='title'
						placeholder='Title'
						className='form-control mb-3'
						value={form.title}
						onChange={handleChange}
						required
					/>
					<textarea
						name='content'
						placeholder='Content'
						className='form-control mb-3'
						rows='6'
						value={form.content}
						onChange={handleChange}
						required
					/>
					<button type='submit' className='btn btn-primary w-100'>
						Publish
					</button>
				</form>
			</div>
		</div>
	);
}

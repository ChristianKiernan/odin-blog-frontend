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

	const handleSubmit = async (isPublished) => {
		setError('');

		try {
			await createPost({ ...form, isPublished }, user?.token);
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to create post.');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4'>
			<div className='bg-white shadow-md rounded-lg w-full max-w-2xl p-6'>
				<h2 className='text-2xl font-bold mb-6 text-gray-800'>
					Create a New Post
				</h2>

				{error && (
					<div className='mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
						{error}
					</div>
				)}

				<form onSubmit={(e) => e.preventDefault()}>
					<input
						type='text'
						name='title'
						placeholder='Title'
						className='border border-gray-300 rounded-md w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400'
						value={form.title}
						onChange={handleChange}
						required
					/>

					<textarea
						name='content'
						placeholder='Content'
						rows='6'
						className='border border-gray-300 rounded-md w-full p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
						value={form.content}
						onChange={handleChange}
						required
					/>

					<div className='flex justify-end space-x-3'>
						<button
							type='button'
							onClick={() => handleSubmit(false)}
							className='bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors'
						>
							Save as Draft
						</button>
						<button
							type='button'
							onClick={() => handleSubmit(true)}
							className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors'
						>
							Publish
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

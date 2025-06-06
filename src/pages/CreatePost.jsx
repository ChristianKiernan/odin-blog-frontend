import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../api/posts';
import Button from '../components/Button';

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
		<div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
			<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
				<h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
				{error && (
					<div className="bg-red-100 text-red-700 p-3 rounded mb-4">
						{error}
					</div>
				)}
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						type="text"
						name="title"
						placeholder="Title"
						className="w-full p-3 border border-gray-300 rounded mb-4"
						value={form.title}
						onChange={handleChange}
						required
					/>
					<textarea
						name="content"
						placeholder="Content"
						className="w-full p-3 border border-gray-300 rounded mb-4"
						rows="6"
						value={form.content}
						onChange={handleChange}
						required
					/>
					<div className="flex gap-3">
						<Button
							variant="secondary"
							type="button"
							onClick={() => handleSubmit(false)}
						>
							Save as Draft
						</Button>
						<Button
							variant="primary"
							type="button"
							onClick={() => handleSubmit(true)}
						>
							Publish
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}


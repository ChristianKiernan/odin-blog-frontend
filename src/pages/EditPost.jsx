import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchPostById, updatePost } from '../api/posts';

export default function EditPost() {
	const { id } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({ title: '', content: '' });
	const [error, setError] = useState('');

	useEffect(() => {
		if (!user?.token) return;
		async function load() {
			try {
				const res = await fetchPostById(id, user.token);
				const postData = res.data?.data?.post || res.data?.post || res;
                
				// Redirect if not author
				if (user.id !== postData.author?.id) {
					navigate('/');
					return;
				}
				setForm({ title: postData.title, content: postData.content });
			} catch (err) {
				console.error(err);
				setError('Failed to load post.');
			}
		}
		load();
	}, [id, user, navigate]);

	const handleChange = (e) =>
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updatePost(id, form, user.token);
			navigate(`/posts/${id}`);
		} catch (err) {
			console.error(err);
			setError('Failed to update post.');
		}
	};

	if (error)
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<p className='text-red-600'>{error}</p>
			</div>
		);

	return (
		<div className='min-h-screen bg-gray-100 py-8 px-4'>
			<div className='max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6'>
				<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
					Edit Post
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						name='title'
						type='text'
						value={form.title}
						onChange={handleChange}
						placeholder='Title'
						className='w-full border rounded p-3'
						required
					/>
					<textarea
						name='content'
						value={form.content}
						onChange={handleChange}
						placeholder='Content'
						rows={6}
						className='w-full border rounded p-3'
						required
					/>
					<button
						type='submit'
						className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded'
					>
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
}

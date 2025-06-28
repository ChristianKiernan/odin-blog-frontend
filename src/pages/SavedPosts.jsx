import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDraftsByUser } from '../api/users';

export default function SavedPosts() {
	const { user } = useAuth();
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		async function loadSaved() {
			if (!user?.token) return;

			try {
				const data = await getDraftsByUser(user.token, user.id);
				setPosts(data.posts || []);
			} catch (err) {
				console.error('Error loading saved posts:', err);
				setError('Failed to load saved posts.');
			}
		}

		loadSaved();
	}, [user]);

	if (error) {
		return (
			<div className='min-h-screen bg-gray-800 py-8 px-4'>
				<div className='max-w-3xl mx-auto'>
					<div className='mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
						{error}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-800 py-8 px-4'>
			<div className='max-w-3xl mx-auto'>
				<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
					Saved Posts (Drafts)
				</h2>

				{posts.length === 0 ? (
					<p className='text-gray-600'>You have no saved drafts.</p>
				) : (
					posts.map((post) => (
						<div
							key={post.id}
							className='bg-white shadow-md rounded-lg p-6 mb-6'
						>
							<h4 className='text-xl font-bold mb-2 text-gray-800'>
								{post.title}
							</h4>
							<p className='mb-4 text-gray-700'>{post.content}</p>
							<small className='text-gray-500'>
								Draft by you
							</small>
						</div>
					))
				)}
			</div>
		</div>
	);
}

import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';
import { useAuth } from '../context/AuthContext';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState('');
	const { user } = useAuth();

	useEffect(() => {
		const loadPosts = async () => {
			try {
				const res = await fetchPosts(user?.token);
				setPosts(res.data.posts);
			} catch (err) {
				console.error('Failed to fetch posts:', err);
				setError('Failed to load posts.');
			}
		};

		if (user?.token) loadPosts();
	}, [user]);

	return (
		<div className='min-h-screen bg-gray-100 py-8 px-4'>
			<div className='max-w-3xl mx-auto'>
				<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
					Latest Posts
				</h2>

				{error && (
					<div className='mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
						{error}
					</div>
				)}

				{!error && posts.length === 0 && (
					<p className='text-gray-600 mb-4'>No posts found.</p>
				)}

				{posts.map((post) => (
					<div
						key={post.id}
						className='bg-white shadow-md rounded-lg p-6 mb-6'
					>
						<h4 className='text-xl font-bold mb-2 text-gray-800'>
							{post.title}
						</h4>
						<p className='mb-4 text-gray-700'>{post.content}</p>
						<small className='text-gray-500'>
							by {post.author.username}
						</small>
					</div>
				))}
			</div>
		</div>
	);
}

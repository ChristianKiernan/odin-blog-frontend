import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
			<div className='max-w-4xl mx-auto space-y-6'>
				{posts.length === 0 ? (
					<p className='text-gray-600'>No posts available.</p>
				) : (
					posts.map((post) => (
						<Link
							key={post.id}
							to={`/posts/${post.id}`}
							className='block bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow'
						>
							<h2 className='text-2xl font-bold mb-2 text-gray-800'>
								{post.title}
							</h2>
							<p className='text-gray-700 mb-4 line-clamp-3'>
								{post.content}
							</p>
							<div className='text-sm text-gray-500'>
								By {post.author?.username || 'Unknown'} on{' '}
								{new Date(post.createdAt).toLocaleDateString()}
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
}

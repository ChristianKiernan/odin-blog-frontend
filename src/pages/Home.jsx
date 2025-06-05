import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/posts';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPosts()
			.then((data) => {
				setPosts(data.posts || []);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Failed to fetch posts:', err);
				setLoading(false);
			});
	}, []);

	if (loading) return <p>Loading posts...</p>;

	return (
		<div className='container mt-4'>
			<h2>Latest Posts</h2>
			{posts.length === 0 ? (
				<p>No posts available.</p>
			) : (
				posts.map((post) => <PostCard key={post.id} post={post} />)
			)}
		</div>
	);
}

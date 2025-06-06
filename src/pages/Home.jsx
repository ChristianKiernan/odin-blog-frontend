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
        setError('Failed to load posts');
      }
    };

    if (user?.token) loadPosts();
  }, [user]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!posts.length) return <p>No posts found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow rounded p-4 mb-4"
        >
          <h4 className="text-xl font-bold mb-2">{post.title}</h4>
          <p className="mb-2">{post.content}</p>
          <small className="text-gray-600">by {post.author.username}</small>
        </div>
      ))}
    </div>
  );
}


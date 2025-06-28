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
    <div className="space-y-6">
      {error && (
        <div className="text-red-500 font-medium">
          {error}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="block
                       bg-white border border-gray-200
                       shadow-md rounded-xl p-8
                       hover:shadow-lg transition-shadow"
          >
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
              {post.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4 line-clamp-3">
              {post.content}
            </p>
            <div className="text-sm text-gray-500">
              By {post.author?.username || 'Unknown'} on{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchPostById, deletePost } from '../api/posts';
import CommentSection from '../components/CommentSection';

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetchPostById(id, user.token);
        const postData =
          res.data?.data?.post ||
          res.data?.post ||
          res.post ||
          res;
        setPost(postData);
      } catch {
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    }
    if (user?.token) loadPost();
  }, [id, user]);

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?'))
      return;
    try {
      await deletePost(post.id, user.token);
      navigate('/');
    } catch {
      setError('Failed to delete post.');
    }
  };

  if (loading || error || !post) {
    const msg = loading
      ? 'Loading post…'
      : error || 'Post not found.';
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className={error ? 'text-red-600' : ''}>{msg}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8">
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {post.title}
        </h1>
        <div className="text-lg text-gray-700 mb-2 leading-relaxed">
          {post.content}
        </div>
        {/* Author & date metadata now underneath the content */}
        <div className="text-sm italic text-gray-500 mb-4">
          By {post.author?.username || 'Unknown'} on{' '}
          {new Date(post.createdAt).toLocaleString()}
        </div>

        {/* Edit/Delete actions */}
        {user?.id === post.author?.id && (
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => navigate(`/edit/${post.id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white
                         text-sm font-medium px-3 py-1 rounded transition"
            >
              Edit
            </button>
            <button
              onClick={handleDeletePost}
              className="bg-red-600 hover:bg-red-700 text-white
                         text-sm font-medium px-3 py-1 rounded transition"
            >
              Delete
            </button>
          </div>
        )}

        {/* Smooth separator */}
        <hr className="border-t border-gray-200 mb-8" />

        {/* Comments */}
        <CommentSection />
      </div>
    </div>
  );
}


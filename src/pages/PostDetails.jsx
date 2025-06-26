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
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    }
    if (user?.token) {
      loadPost();
    }
  }, [id, user]);

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await deletePost(post.id, user.token);

      // back to home after delete
      navigate('/'); 
    } catch (err) {
      console.error('Delete post failed:', err);
      setError('Failed to delete post.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading post…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {post.title}
        </h1>
        <div className="text-sm text-gray-500 mb-6">
          By {post.author?.username || 'Unknown'} on{' '}
          {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="prose mb-6 text-gray-700">{post.content}</div>

        {user?.id === post.author?.id && (
          <div className="mt-4 space-x-4">
            <Link
              to={`/edit/${post.id}`}
              className="text-blue-600 hover:underline"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDeletePost}
              className="text-red-600 hover:underline"
            >
              Delete Post
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-600 mt-4">
            {error}
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}


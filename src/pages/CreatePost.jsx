import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../api/posts';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="bg-white border border-gray-200 shadow-md rounded-xl w-full max-w-2xl p-8">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
        Create a New Post
      </h2>

      {error && (
        <div className="mb-6 bg-red-200 border border-red-500 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border border-gray-400 rounded-md w-full p-4 mb-4
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          rows="6"
          className="border border-gray-400 rounded-md w-full p-4 mb-6
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     resize-none text-lg"
          value={form.content}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            className="bg-gray-700 hover:bg-gray-800 text-white
                       font-semibold py-3 px-6 rounded-md
                       transition-colors text-lg"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold py-3 px-6 rounded-md
                       transition-colors text-lg"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

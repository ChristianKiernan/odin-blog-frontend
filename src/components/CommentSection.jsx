import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import {
  fetchCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from '../api/comments';

export default function CommentSection() {
  const { user } = useAuth();
  const { id: postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      if (!user?.token) return;
      try {
        const res = await fetchCommentsByPost(postId, user.token);
        setComments(res.data?.data?.comments || res.data?.comments || []);
      } catch {
        setError('Failed to load comments.');
      }
    }
    load();
  }, [postId, user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    try {
      const res = await createComment(postId, { content: newText }, user.token);
      setComments([res.data.comment, ...comments]);
      setNewText('');
    } catch {
      setError('Failed to post comment.');
    }
  };

  const beginEdit = (c) => { setEditingId(c.id); setEditText(c.content); };
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;
    try {
      const res = await updateComment(
        postId,
        editingId,
        { content: editText },
        user.token
      );
      const updated =
        res.data?.data?.updatedComment || res.data?.updatedComment;
      setComments(comments.map((c) => (c.id === editingId ? updated : c)));
      setEditingId(null);
      setEditText('');
    } catch {
      setError('Failed to update comment.');
    }
  };
  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(postId, commentId, user.token);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      setError('Failed to delete comment.');
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
        Comments
      </h3>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {user && (
        <form onSubmit={handleAdd} className="mb-6 space-y-4">
          <textarea
            rows={3}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Add a comment…"
            className="border border-gray-400 rounded-md w-full p-4
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-lg resize-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold py-3 px-6 rounded-md
                       transition-colors text-lg"
          >
            Post Comment
          </button>
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-600">No comments yet.</p>
      ) : (
        comments.map((comment, idx) => (
          <div key={comment.id}>
            {/* Separator */}
            {idx > 0 && <hr className="border-t border-gray-200 my-4" />}
            <div className="pt-4">
              <p className="text-base text-gray-800 leading-snug mb-2">
                {comment.content}
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-2">
                <div className="text-sm italic text-gray-500">
                  By {comment.author?.username || 'Unknown'} on{' '}
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
                {user?.id === comment.author?.id && (
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => beginEdit(comment)}
                      className="bg-blue-600 hover:bg-blue-700 text-white
                                 text-sm font-medium px-2 py-1 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="bg-red-600 hover:bg-red-700 text-white
                                 text-sm font-medium px-2 py-1 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editingId === comment.id && (
                <form onSubmit={handleEdit} className="space-y-4">
                  <textarea
                    rows={2}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border border-gray-400 rounded-md w-full p-4
                               focus:outline-none focus:ring-2 focus:ring-blue-500
                               text-lg resize-none"
                  />
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white
                                 text-sm font-medium px-2 py-1 rounded-md transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="bg-gray-100 hover:bg-gray-200
                                 text-gray-600 text-sm font-medium px-2 py-1 rounded-md transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}





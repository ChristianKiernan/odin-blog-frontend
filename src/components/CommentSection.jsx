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

	// Load comments on mount and when postId changes
	useEffect(() => {
		async function load() {
			if (!user?.token) return;

			try {
				const res = await fetchCommentsByPost(postId, user.token);
				const commentsArray =
					res.data?.data?.comments || res.data?.comments || [];
				setComments(commentsArray);
			} catch (err) {
				console.error('Could not load comments:', err);
				setError('Failed to load comments.');
			}
		}
		load();
	}, [postId, user]);

	// Add a new comment
	const handleAdd = async (e) => {
		e.preventDefault();
		if (!newText.trim()) return;
		try {
			const res = await createComment(
				postId,
				{ content: newText },
				user.token
			);
			setComments([res.data.comment, ...comments]);
			setNewText('');
		} catch {
			setError('Failed to post comment.');
		}
	};

	// Start editing
	const beginEdit = (comment) => {
		setEditingId(comment.id);
		setEditText(comment.text);
	};

	// Submit edit
	const handleEdit = async (e) => {
		e.preventDefault();
		if (!editText.trim()) return;

		console.log('✏️ Updating comment →', {
			postId,
			commentId: editingId,
			data: { content: editText },
			token: user?.token,
		});

		try {
			const res = await updateComment(
				postId,
				editingId,
				{ content: editText },
				user.token
			);
			// pull out the updated comment from the response:
			const updated =
				res.data?.data?.updatedComment || res.data?.updatedComment;
			setComments(
				comments.map((c) => (c.id === editingId ? updated : c))
			);
			setEditingId(null);
			setEditText('');
		} catch (err) {
			console.error('🚨 Comment update error:', err.response || err);
			setError('Failed to update comment.');
		}
	};

	// Delete comment
	const handleDelete = async (commentId) => {
		if (!window.confirm('Delete this comment?')) return;

		try {
			await deleteComment(postId, commentId, user.token);

			// filter out the deleted comment by its id:
			setComments((prevComments) =>
				prevComments.filter((c) => c.id !== commentId)
			);
		} catch {
			setError('Failed to delete comment.');
		}
	};

	return (
		<div className='mt-8'>
			<h3 className='text-xl font-semibold mb-4'>Comments</h3>
			{error && <p className='text-red-600 mb-2'>{error}</p>}

			{user && (
				<form onSubmit={handleAdd} className='mb-6'>
					<textarea
						value={newText}
						onChange={(e) => setNewText(e.target.value)}
						placeholder='Add a comment…'
						className='w-full border rounded p-2 mb-2'
						rows={3}
					/>
					<button
						type='submit'
						className='bg-blue-600 text-white px-4 py-2 rounded'
					>
						Post Comment
					</button>
				</form>
			)}

			{comments.length === 0 ? (
				<p className='text-gray-600'>No comments yet.</p>
			) : (
				comments.map((comment) => (
					<div
						key={comment.id}
						className='border-b py-4 last:border-none'
					>
						<p className='text-gray-800'>{comment.content}</p>
						<div className='text-sm text-gray-500 mb-2'>
							By {comment.author?.username || 'Unknown'} on{' '}
							{new Date(comment.createdAt).toLocaleString()}
						</div>

						{/* If this user wrote it, show edit/delete */}
						{user?.id === comment.author.id && (
							<div className='space-x-2'>
								<button
									className='text-blue-600'
									onClick={() => beginEdit(comment)}
								>
									Edit
								</button>
								<button
									className='text-red-600'
									onClick={() => handleDelete(comment.id)}
								>
									Delete
								</button>
							</div>
						)}

						{/* Inline edit form */}
						{editingId === comment.id && (
							<form onSubmit={handleEdit} className='mt-2'>
								<textarea
									value={editText}
									onChange={(e) =>
										setEditText(e.target.value)
									}
									className='w-full border rounded p-2 mb-2'
									rows={2}
								/>
								<button
									type='submit'
									className='bg-green-600 text-white px-3 py-1 rounded mr-2'
								>
									Save
								</button>
								<button
									type='button'
									className='text-gray-600'
									onClick={() => setEditingId(null)}
								>
									Cancel
								</button>
							</form>
						)}
					</div>
				))
			)}
		</div>
	);
}

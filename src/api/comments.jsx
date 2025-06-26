import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const commentsApi = axios.create({
	baseURL: `${API_BASE_URL}/posts`,
});

// Get all comments for a specific post
export const fetchCommentsByPost = async (postId, token) => {
	const res = await commentsApi.get(`/${postId}/comments`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

// Create a new comment under a post
export const createComment = async (postId, commentData, token) => {
	const res = await commentsApi.post(`/${postId}/comments`, commentData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

// Update an existing comment
export const updateComment = async (postId, commentId, commentData, token) => {
	const res = await commentsApi.put(`/${postId}/comments/${commentId}`, commentData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

// Delete a comment
export const deleteComment = async (postId, commentId, token) => {
	const res = await commentsApi.delete(`/${postId}/comments/${commentId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

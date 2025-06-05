import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const postsApi = axios.create({
	baseURL: `${API_BASE_URL}/posts`,
});

// Get all published posts
export const fetchPosts = async () => {
	const res = await postsApi.get('/');
	return res.data;
};

// Get single post by ID
export const fetchPostById = async (id) => {
	const res = await postsApi.get(`/${id}`);
	return res.data;
};

// Create new post (requires auth)
export const createPost = async (postData, token) => {
	const res = await postsApi.post('/', postData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

// Update existing post (requires auth)
export const updatePost = async (id, postData, token) => {
	const res = await postsApi.put(`/${id}`, postData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

// Delete a post (requires admin auth)
export const deletePost = async (id, token) => {
	const res = await postsApi.delete(`/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

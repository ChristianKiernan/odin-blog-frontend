import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import SavedPosts from './pages/SavedPosts';
import PostDetails from './pages/PostDetails';
import Login from './auth/Login';
import Register from './auth/Register';

export default function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}
			>
				<Route index element={<Home />} />
				<Route path='create' element={<CreatePost />} />
				<Route path='saved' element={<SavedPosts />} />
				<Route path='posts/:id' element={<PostDetails />} />
				<Route path='edit/:id' element={<EditPost />} />
			</Route>

			{/* Public routes */}
			<Route element={<Layout />}>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Route>

			{/* As a fallback, any other path redirects to “/” */}
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	);
}

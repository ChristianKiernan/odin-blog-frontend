import { Outlet } from 'react-router-dom';

export default function App() {
	return (
		<div className='d-flex justify-content-center align-items-center min-vh-100'>
			<div
				className='container p-4 shadow rounded bg-white'
				style={{ maxWidth: '600px' }}
			>
				<h1 className='text-center mb-4'>Odin Blog</h1>
				<Outlet />
			</div>
		</div>
	);
}

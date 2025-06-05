import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<>
			<Navbar />
			<div className='d-flex justify-content-center align-items-start min-vh-100 py-5 bg-light'>
				<div
					className='container bg-white p-4 rounded shadow'
					style={{ maxWidth: '700px', width: '100%' }}
				>
					<Outlet />
				</div>
			</div>
		</>
	);
}

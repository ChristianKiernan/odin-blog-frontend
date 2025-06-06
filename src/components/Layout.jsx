// src/components/Layout.jsx
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<>
			<Navbar />
			<div className='flex justify-center items-start min-h-screen py-16 bg-gray-100'>
				<div className='bg-white p-6 rounded-lg shadow-md w-full max-w-3xl'>
					<Outlet />
				</div>
			</div>
		</>
	);
}

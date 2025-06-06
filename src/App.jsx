import { Outlet } from 'react-router-dom';

export default function App() {
	return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <div className="bg-white shadow-lg p-10 rounded-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind Works 🎉</h1>
        <p className="text-gray-600">If you see this styled properly, you're all set.</p>
      </div>
    </div>
  );
	// return (
	// 	<div className='d-flex justify-content-center align-items-center min-vh-100'>
	// 		<div
	// 			className='container p-4 shadow rounded bg-white'
	// 			style={{ maxWidth: '600px' }}
	// 		>
	// 			<h1 className='text-center mb-4'>Odin Blog</h1>
	// 			<Outlet />
	// 		</div>
	// 	</div>
	// );
}

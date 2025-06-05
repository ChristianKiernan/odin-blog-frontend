export default function CenteredCard({ children }) {
	return (
		<div className='d-flex justify-content-center align-items-start min-vh-100 py-5 bg-light'>
			<div
				className='container bg-white p-4 rounded shadow'
				style={{ maxWidth: '500px', width: '100%' }}
			>
				{children}
			</div>
		</div>
	);
}

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light px-4'>
			<Link className='navbar-brand' to='/'>
				My Blog
			</Link>
			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav ms-auto'>
					{user ? (
						<>
							<li className='nav-item'>
								<Link className='nav-link' to='/'>
									Home
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/create'>
									New Post
								</Link>
							</li>
							<li className='nav-item'>
								<button
									className='btn btn-outline-danger ms-3'
									onClick={handleLogout}
								>
									Logout
								</button>
							</li>
						</>
					) : (
						<>
							<li className='nav-item'>
								<Link className='nav-link' to='/login'>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/register'>
									Register
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

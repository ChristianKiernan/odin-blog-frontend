import { Link } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<div id='error-page'>
			<h2>Congrats, this page doesn't exist</h2>
			<Link to='/'>Go back</Link>
		</div>
	);
};

export default ErrorPage;

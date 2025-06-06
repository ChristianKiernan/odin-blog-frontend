export default function Button({ children, variant = 'primary', ...props }) {
	const baseClass = 'rounded px-4 py-2 transition';
	const variants = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-500 text-white hover:bg-gray-600',
	};

	return (
		<button className={`${baseClass} ${variants[variant]}`} {...props}>
			{children}
		</button>
	);
}

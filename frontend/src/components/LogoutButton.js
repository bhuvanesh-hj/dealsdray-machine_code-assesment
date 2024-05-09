
const Button = ({ children, onClick }) => {
	return (
		<button className="w-10 h-10 hover:bg-slate-400 hover:rounded-xl flex items-center justify-center" onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;

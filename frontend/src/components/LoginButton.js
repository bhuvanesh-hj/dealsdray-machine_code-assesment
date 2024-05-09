import React from "react";

const LoginButton = ({ type,children }) => {
	return (
		<button className="inline-flex bg-[rgb(24,24,27)] text-white items-center justify-center w-full h-10 rounded-md hover:bg-gray-800" type={type}>
			{children}
		</button>
	);
};

export default LoginButton;

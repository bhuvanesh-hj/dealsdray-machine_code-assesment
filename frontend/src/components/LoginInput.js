import React from "react";

const LoginInput = ({
	id,
	placeholder,
	type,
	onChange,
	required,
	name,
	value,
}) => {
	return (
		<input
			className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			id={id}
			placeholder={placeholder}
			type={type}
			name={name}
			defaultValue={value}
			onChange={onChange}
			required={required}
		/>
	);
};

export default LoginInput;

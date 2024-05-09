import React from "react";

const NotFound = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="text-center text-3xl font-extrabold text-gray-900">
						404 - Not Found
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						The page you are looking for does not exist.
					</p>
					<p className="mt-2 text-center text-sm text-gray-600">
						Click on the log to go to the home page.
					</p>
				</div>
			</div>
		</div>
	);
};

export default NotFound;

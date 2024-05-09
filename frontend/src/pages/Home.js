import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
			navigate("/");
			return;
		}
	}, [navigate]);

	return (
		<section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
			<div className="container flex flex-col items-center gap-6 px-4 md:px-6">
				<div className="space-y-3 text-center">
					<h1 className="text-3xl font-bold tracking-tighter md:text-6xl">
						Welcome to Admin Panel
					</h1>
					<p className="max-w-[600px] flex justify-center items-center ml-4 text-gray-500 md:text-xl lg:text-base xl:text-xl">
						Manage your employees and company data with ease.
					</p>
				</div>
				<Link to="/createEmployee">
					<button className="rounded-md bg-gray-900 px-6 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-700">
						Create Employee
					</button>
				</Link>
			</div>
		</section>
	);
};

export default Home;

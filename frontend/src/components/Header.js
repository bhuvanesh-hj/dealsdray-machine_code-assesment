import React, { useContext, useEffect, useState } from "react";

import { NavLink as Link, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { MyContext } from "../MyContext";

const Header = () => {
	const location = useLocation();
	const [signedIn, setSignedIn] = useState(false);
	const [user, setUser] = useState("");
	const { ref } = useContext(MyContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser("");
		setSignedIn(false);
		navigate("/");
	};

	useEffect(() => {
		if (localStorage.getItem("token") && localStorage.getItem("user")) {
			let user = JSON.parse(localStorage.getItem("user"));
			setSignedIn(true);
			setUser(user);
		}
	}, [ref]);

	return (
		<header className="flex h-16 w-full items-center justify-between px-6 bg-gray-950 text-gray-50">
			<div className="flex items-center gap-20">
				<Link className="flex items-center gap-2" to={"/home"}>
					<img
						src="https://seeklogo.com/images/E/ems-remedios-logo-71E9300600-seeklogo.com.png"
						alt="LOGO"
						className="w-20"
					/>
				</Link>
				{signedIn && (
					<nav className="flex items-center gap-6">
						<Link
							className={`text-sm py-1 px-3 ${
								location.pathname === "/home" && "bg-slate-200 text-black"
							} rounded-lg  font-medium hover:scale-110 underline-offset-4`}
							to="/home">
							Home
						</Link>
						<Link
							className={`text-sm py-1 px-3 ${
								location.pathname === "/employeeList" &&
								"bg-slate-200 text-black"
							} rounded-lg  font-medium hover:scale-110 underline-offset-4`}
							to="/employeeList">
							Employee List
						</Link>
					</nav>
				)}
			</div>
			{signedIn && (
				<div className="flex items-center gap-6">
					<span className="text-sm font-medium">{user}</span>
					<div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-50">
						<span className="text-gray-600 text-xl">
							{user.split("").splice(0, 2).join("")}
						</span>
					</div>{" "}
					<LogoutButton onClick={handleLogout}>
						<LogOutIcon className="h-5 w-5" />
					</LogoutButton>
				</div>
			)}
		</header>
	);
};

export default Header;

function LogOutIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<polyline points="16 17 21 12 16 7" />
			<line x1="21" x2="9" y1="12" y2="12" />
		</svg>
	);
}

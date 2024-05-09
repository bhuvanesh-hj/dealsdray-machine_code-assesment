import React, { useContext, useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../MyContext";

const Login = () => {
	const [signIn, setSignIn] = useState(true);
	const [error, setError] = useState("");
	const [signUpData, setSignUpData] = useState({});
	const [signInData, setSignInData] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { ref,setRef } = useContext(MyContext);

	// SignUp handlers
	const handleSignUpChange = (e) => {
		setError("");
		setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
	};

	const handleSignUpSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			if (signUpData.username.length < 3 && signUpData.password.length < 5) {
				setError(
					"Username and password must be at least 3 and 5 characters long"
				);
				return;
			}
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const signUp = await axios.post(
				"http://localhost:4000/api/admin/signup",
				signUpData,
				config
			);

			console.log("signUp successful", signUp);
			e.target.reset();
			setSignUpData({});
			setSignInData({});
			setSignIn(true);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error.response.data.error);
		}
	};

	// Signin handlers
	const handleSignInChange = (e) => {
		setError("");
		setSignInData({ ...signInData, [e.target.id]: e.target.value });
	};

	const handleSignInSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			if (signInData.username.length < 3 && signInData.password.length < 5) {
				setError(
					"Username and password must be at least 3 and 5 characters long"
				);
				return;
			}
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const signIn = await axios.post(
				"http://localhost:4000/api/admin/signin",
				signInData,
				config
			);

			console.log("signIn successful");
			e.target.reset();
			setSignUpData({});
			setSignInData({});

			localStorage.setItem("token", JSON.stringify(signIn.data.token));
			localStorage.setItem("user", JSON.stringify(signIn.data.user.username));
			setRef(!ref);
			setLoading(false);
			navigate("/home");
			// console.log(signIn.data.user.username);
		} catch (error) {
			setLoading(false);
			setError(error.response?.data?.message);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/home");
		}
	}, [navigate]);

	return (
		<div className="grid grid-cols-1 h-screen lg:grid-cols-1">
			{signIn ? (
				<div className="flex items-center justify-center bg-gray-100 p-8 dark:bg-slate-300">
					<div className="w-full max-w-md space-y-6">
						<div className="space-y-2 text-center">
							<h1 className="text-3xl font-bold">Sign In</h1>
							<p className="text-gray-500 dark:text-gray-600">
								Welcome back! Please sign in to your account.
							</p>
						</div>
						<form
							className="space-y-4"
							onSubmit={handleSignInSubmit}
							method="POST">
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="email">
									UserName
								</label>
								<LoginInput
									id="username"
									placeholder="Enter your username"
									type="text"
									onChange={handleSignInChange}
									value={signInData.userName}
									required={true}
								/>
							</div>
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="password">
									Password
								</label>
								<LoginInput
									id="password"
									type="password"
									onChange={handleSignInChange}
									value={signInData.userName}
									required={true}
								/>
							</div>
							{error !== " " && <i className="text-red-500">{error}</i>}
							<LoginButton type="submit">
								{loading ? "Loading..." : "Sign In"}
							</LoginButton>
						</form>
						<p className="text-center text-sm text-gray-500 dark:text-gray-600">
							Don't have an account?
							<Link
								className="font-medium underline"
								onClick={() => setSignIn(!signIn)}
								href="#">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center bg-gray-100 p-8 dark:bg-slate-300">
					<div className="w-full max-w-md space-y-6">
						<div className="space-y-2 text-center">
							<h1 className="text-3xl font-bold">Sign Up</h1>
							<p className="text-gray-500">
								Create a new account to get started.
							</p>
						</div>
						<form
							className="space-y-4"
							onSubmit={handleSignUpSubmit}
							method="POST">
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="name">
									UserName
								</label>
								<LoginInput
									type="text"
									id="username"
									placeholder="Enter your username"
									onChange={handleSignUpChange}
									required={true}
									value={signUpData.username}
								/>
							</div>
							<div className="space-y-2">
								<label
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									htmlFor="password">
									Password
								</label>
								<LoginInput
									id="password"
									type="password"
									onChange={handleSignUpChange}
									required={true}
									value={signUpData.password}
								/>
							</div>
							{error !== " " && <i className="text-red-500">{error}</i>}
							<LoginButton type="submit">
								{loading ? "Loading..." : "Sign Up"}
							</LoginButton>
						</form>
						<p className="text-center text-sm text-gray-500">
							Already have an account?
							<Link
								className="font-medium underline"
								onClick={() => setSignIn(!signIn)}
								href="#">
								Sign In
							</Link>
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function POSTDetails() {
		try {
			const request = await fetch("http://localhost:4000/login", {
				method: "POST",
				body: JSON.stringify({
					username,
					password,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await request.json();
			if (data.error_message) {
				toast.error(data.error_message);
			} else {
				toast.success(data.message);
				localStorage.setItem("_id", data.data._id);
				localStorage.setItem("_myEmail", data.data._email);
				navigate("/photos");
			}
		} catch (err) {
			console.error(err);
		}
	}
	const handleSignIn = (e) => {
		if (username.trim() && password.trim()) {
			e.preventDefault();
			POSTDetails();
			setPassword("");
			setUsername("");
		}
	};
	return (
		<div className='login'>
			<h2 style={{ marginBottom: "30px" }}>Login</h2>
			<form className='login__form' method='POST' onSubmit={handleSignIn}>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					className='input'
					name='username'
					id='username'
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					className='input'
					name='password'
					id='password'
					required
					minLength={6}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='loginBtn'>LOG IN</button>
				<p style={{ textAlign: "center" }}>
					Don't have an account?{" "}
					<Link className='link' to='/register'>
						Create one
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;

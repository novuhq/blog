import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	async function POSTDetails() {
		try {
			const request = await fetch("http://localhost:4000/register", {
				method: "POST",
				body: JSON.stringify({
					email,
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
				navigate("/");
			}
		} catch (err) {
			console.error(err);
			toast.error("Account creation failed");
		}
	}
	const handleRegister = (e) => {
		e.preventDefault();
		if (username.trim() && password.trim() && email.trim()) {
			POSTDetails();
			setPassword("");
			setUsername("");
			setEmail("");
		}
	};
	return (
		<div className='register'>
			<h2 style={{ marginBottom: "30px" }}>Register</h2>
			<form className='register__form' method='POST' onSubmit={handleRegister}>
				<label htmlFor='email'>Email Address</label>
				<input
					type='email'
					className='input'
					name='email'
					id='email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

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
				<button className='registerBtn'>REGISTER</button>
				<p style={{ textAlign: "center" }}>
					Already have an account?{" "}
					<Link className='link' to='/'>
						Sign in
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;

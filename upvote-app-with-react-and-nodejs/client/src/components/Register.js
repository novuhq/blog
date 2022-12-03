import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ socket }) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		socket.on("registerSuccess", (data) => {
			toast.success(data);
			navigate("/");
		});
		socket.on("registerError", (error) => {
			toast.error(error);
		});
	}, [socket, navigate]);

	const handleRegister = (e) => {
		e.preventDefault();
		if (username.trim() && password.trim() && email.trim()) {
			socket.emit("register", { username, email, password });
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

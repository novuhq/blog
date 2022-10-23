import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ socket }) => {
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		socket.emit("addUser", username);
		localStorage.setItem("username", username);
		navigate("/dashboard");
	};
	return (
		<div className='login'>
			<h2>Sign in to HackBlog</h2>
			<form className='loginForm' onSubmit={handleLogin}>
				<label htmlFor='username'>Enter your username</label>
				<input
					name='username'
					id='username'
					type='text'
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button className='login__cta'>LOG IN</button>
			</form>
		</div>
	);
};

export default Login;

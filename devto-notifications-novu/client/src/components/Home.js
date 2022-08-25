import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [username, setUsername] = useState("");
	const navigate = useNavigate();
	const handleSignIn = (e) => {
		e.preventDefault();
		localStorage.setItem("_username", username);
		setUsername("");
		navigate("/post");
	};
	return (
		<main className='home'>
			<h2>Sign in to Dev.to</h2>
			<form className='home__form' onSubmit={handleSignIn}>
				<label htmlFor='username'>Your Username</label>
				<input
					type='text'
					id='username'
					name='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button className='home__cta'>SIGN IN</button>
			</form>
		</main>
	);
};

export default Home;

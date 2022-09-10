import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ socket }) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [channel, setChannel] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		socket.emit("createChannel", { channel, owner: username });
		navigate(`/channel/${channel}`);
	};
	return (
		<div className='login__container'>
			<h2>Sign in</h2>
			<form className='login__form' onSubmit={handleClick}>
				<label htmlFor='username'>Username</label>
				<input
					name='username'
					id='username'
					type='text'
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor='channelName'>Channel Name</label>
				<input
					type='text'
					id='channelName'
					required
					name='channelName'
					value={channel}
					onChange={(e) => setChannel(e.target.value)}
				/>
				<button className='createChannelBtn'>CREATE CHANNEL</button>
			</form>
		</div>
	);
};

export default Login;

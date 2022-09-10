import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
	const [channels, setChannels] = useState([]);
	const navigate = useNavigate();

	const handleCreateChannel = () => navigate("/login");

	const handleJoinChannel = (channel) => {
		socket.emit("joinChannel", channel);
		navigate(`/channel/${channel}`);
	};

	useEffect(() => {
		socket.on("channels", (data) => setChannels(data));
	}, [socket]);

	return (
		<div>
			<div className='home__container'>
				<h2>Share your screen with friends</h2>
				<button className='createChannelBtn' onClick={handleCreateChannel}>
					CREATE CHANNEL
				</button>
			</div>
			<div className='home__channels'>
				<h3>Available Channels</h3>
				<div className='channels__list'>
					{channels?.map((channel) => (
						<div className='channels__item' key={channel.owner}>
							<p>{channel.channel}</p>
							<button onClick={() => handleJoinChannel(channel.channel)}>
								JOIN
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;

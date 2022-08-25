import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import CreatePost from "./components/CreatePost";

import Nav from "./components/Nav";
import Posts from "./components/Posts";

const socket = socketIO.connect("http://localhost:4000");

const App = () => {
	const [posts, setPosts] = useState([]);

	const postLiked = (id) => socket.emit("postLiked", id);

	useEffect(() => {
		socket.on("posts", (data) => setPosts(data));
	}, []);

	useEffect(() => {
		function fetchNotification() {
			fetch("http://localhost:4000/notify", { method: "POST" })
				.then((res) => res.json())
				.then((data) => console.log(data))
				.catch((err) => console.error(err));
		}
		fetchNotification();
	}, []);

	return (
		<div>
			<Nav />

			<CreatePost socket={socket} />
			<Posts posts={posts} postLiked={postLiked} />
		</div>
	);
};

export default App;

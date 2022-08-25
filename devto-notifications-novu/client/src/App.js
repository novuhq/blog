import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import PostPage from "./components/PostPage";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NullPage from "./components/NullPage";

const socket = socketIO.connect("http://localhost:4000");

const App = () => {
	const [posts, setPosts] = useState([]);

	const postLiked = (id) => socket.emit("postLiked", id);

	useEffect(() => {
		socket.on("posts", (data) => setPosts(data));
	}, []);

	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/post'
					element={
						<PostPage posts={posts} postLiked={postLiked} socket={socket} />
					}
				/>
				<Route path='*' element={<NullPage />} />
			</Routes>
		</div>
	);
};

export default App;

import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import Nav from "./Nav";
import Posts from "./Posts";
import NullPage from "./NullPage";

const PostPage = ({ socket }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		socket.on("posts", (data) => setPosts(data));
	}, []);

	return (
		<div>
			{localStorage.getItem("_username") ? (
				<>
					<Nav />
					<div style={{ backgroundColor: "#efefef", minHeight: "90vh" }}>
						<CreatePost socket={socket} />
						<Posts posts={posts} socket={socket} />
					</div>
				</>
			) : (
				<NullPage />
			)}
		</div>
	);
};

export default PostPage;

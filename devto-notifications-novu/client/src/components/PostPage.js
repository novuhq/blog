import React from "react";
import CreatePost from "./CreatePost";
import Nav from "./Nav";
import Posts from "./Posts";
import NullPage from "./NullPage";
const PostPage = ({ posts, postLiked, socket }) => {
	return (
		<div>
			{localStorage.getItem("_username") ? (
				<>
					<Nav />
					<CreatePost socket={socket} />
					<Posts posts={posts} postLiked={postLiked} />
				</>
			) : (
				<NullPage />
			)}
		</div>
	);
};

export default PostPage;

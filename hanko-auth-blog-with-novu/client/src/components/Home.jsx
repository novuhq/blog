import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Novu from "./Novu";
import { fetchAllPosts } from "../utils.js/util";

const Home = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = useCallback(() => {
		fetchAllPosts(setLoading, setPosts)
	}, []);

	useEffect(() => {
		if (localStorage.getItem("loggedIn")) {
			setLoggedIn(true);
		}
		fetchPosts();
	}, [fetchPosts]);

	if (loading) return <p>Loading...</p>;
	
	return (
		<div>
			<nav className='navbar'>
				<Link to='/' className='logo'>
					<h2>MyBlog</h2>
				</Link>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Novu />
					{loggedIn ? (
						<Link to='/post/new' className='newPostBtn'>
							New Post
						</Link>
					) : (
						<Link to='/login' className='newPostBtn'>
							Log in
						</Link>
					)}
				</div>
			</nav>
			<main className='main'>
				<h2 className='heading'>Latest Posts</h2>
				<div className='posts_container'>
					{posts?.map((post) => (
						<Link to={`/post/${post.slug}`} className='post' key={post.post_id}>
							<h2 className='post_title'>{post.title}</h2>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
};

export default Home;

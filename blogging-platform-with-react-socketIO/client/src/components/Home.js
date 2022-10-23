import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notify from "./Notify";

const Home = ({ socket }) => {
	const navigate = useNavigate();

	const createPostBtn = () => {
		fetchUser();
		navigate("/post/create");
	};
	const fetchUser = () => {
		fetch("http://localhost:4000/users")
			.then((res) => res.json())
			.then((data) => {
				const stringData = data.toString();
				localStorage.setItem("users", stringData);
			})
			.catch((err) => console.error(err));
	};
	const readMoreBtn = (postID) => {
		socket.emit("findPost", postID);
		navigate(`/post/${postID}`);
	};
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		function fetchPosts() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => setPosts(data))
				.catch((err) => console.error(err));
		}
		fetchPosts();
	}, []);

	useEffect(() => {
		socket.on("updatePosts", (posts) => setPosts(posts));
	}, [socket]);

	return (
		<div className='home'>
			<nav className='home__navbar'>
				<h2>HackBlog</h2>
				<div className='home__buttons'>
					<button className='home__createBtn' onClick={createPostBtn}>
						CREATE POST
					</button>
					<Notify />
				</div>
			</nav>

			<div className='posts__container'>
				{posts.map((post) => (
					<div className='post' key={post.id}>
						<h3>{post.title}</h3>
						<button className='post__cta' onClick={() => readMoreBtn(post.id)}>
							READ MORE
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;

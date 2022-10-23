import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogPost = ({ socket }) => {
	const { id } = useParams();
	const [comment, setComment] = useState("");
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);

	const handleAddComment = (e) => {
		e.preventDefault();
		socket.emit("newComment", {
			comment,
			user: localStorage.getItem("username"),
			postID: id,
		});
		setComment("");
	};

	useEffect(() => {
		socket.on("postDetails", (data) => {
			setPost(data);
			setLoading(false);
		});
	}, [socket]);

	if (loading) {
		return <h2>Loading... Please wait</h2>;
	}
	return (
		<div className='blogPost'>
			<div className='blogPost__container'>
				<h1>{post.title}</h1>
				<div className='blogPost__meta'>
					<p className='blogPost__author'>By {post.author}</p>
					<p className='blogPost__date'>Created on {post.createdAt}</p>
				</div>

				<div className='blogPost__content'>{post.content}</div>
			</div>

			<div className='comments__container'>
				<h2>Add Comments</h2>
				<form className='comments__inputContainer' onSubmit={handleAddComment}>
					<textarea
						placeholder='Type in your comments...'
						rows={5}
						className='comments__input'
						value={comment}
						required
						onChange={(e) => setComment(e.target.value)}
					/>
					<button className='comments__cta'>Add Comment</button>
				</form>

				<div>
					{post.comments.map((item) => (
						<p className='comment' key={item.id}>
							<span style={{ fontWeight: "bold", marginRight: "15px" }}>
								{item.user}
							</span>
							{item.message}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default BlogPost;

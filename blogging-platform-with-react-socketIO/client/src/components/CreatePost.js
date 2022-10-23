import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

const CreatePost = ({ socket }) => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		function getUsers() {
			const storedUsers = localStorage.getItem("users").split(",");
			setUsers(storedUsers);
		}
		getUsers();
	}, []);

	const suggestions = users.map((name) => {
		return {
			id: name,
			text: name,
		};
	});

	const KeyCodes = {
		comma: 188,
		enter: 13,
	};

	const delimiters = [KeyCodes.comma, KeyCodes.enter];

	const [postTitle, setPostTitle] = useState("");
	const [postContent, setPostContent] = useState("");

	const currentDate = () => {
		const d = new Date();
		return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
	};

	//...react tags

	const [tags, setTags] = useState([]);

	const handleDelete = (i) => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setTags([...tags, tag]);
	};

	const handleTagClick = (index) => {
		console.log("The tag at index " + index + " was clicked");
	};

	const addPost = (e) => {
		e.preventDefault();
		socket.emit("createPost", {
			postTitle,
			postContent,
			username: localStorage.getItem("username"),
			timestamp: currentDate(),
			tags,
		});
		navigate("/dashboard");
	};

	return (
		<div className='createPost'>
			<h2>Create a new Post</h2>
			<form className='createForm' onSubmit={addPost}>
				<label htmlFor='title'> Title</label>
				<input
					type='text'
					required
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
					className='createForm__title'
				/>

				<label htmlFor='title'> Content</label>
				<textarea
					required
					rows={15}
					value={postContent}
					onChange={(e) => setPostContent(e.target.value)}
					className='createForm__content'
				/>

				<ReactTags
					tags={tags}
					suggestions={suggestions}
					delimiters={delimiters}
					handleDelete={handleDelete}
					handleAddition={handleAddition}
					handleTagClick={handleTagClick}
					inputFieldPosition='bottom'
					autocomplete
				/>
				<button className='createForm__button'>ADD POST</button>
			</form>
		</div>
	);
};

export default CreatePost;

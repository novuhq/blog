import React, { useState } from "react";

const CreatePost = ({ socket }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	function addNewPost(e) {
		e.preventDefault();
		socket.emit("newPost", {
			id: Math.random(),
			title,
			content,
			likes: 0,
			username: localStorage.getItem("_username"),
		});
		sendNotification();
		setContent("");
		setTitle("");
	}

	async function sendNotification() {
		try {
			const sendNotification = await fetch("http://localhost:4000/notify", {
				method: "POST",
				body: JSON.stringify({
					username: localStorage.getItem("_username"),
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await sendNotification.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<div className='input__container'>
			<form className='input__form' onSubmit={addNewPost}>
				<label htmlFor='title'>Title</label>
				<input
					name='title'
					type='text'
					id='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>

				<textarea
					name='content'
					id='content'
					rows='7'
					placeholder='Write the contents'
					value={content}
					required
					onChange={(e) => setContent(e.target.value)}
				></textarea>
				<div>
					<button className='sendBtn'>SEND POST</button>
				</div>
			</form>
		</div>
	);
};

export default CreatePost;

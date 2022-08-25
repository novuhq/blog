import React, { useState } from "react";

const CreatePost = ({ socket }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const addNewPost = (e) => {
		e.preventDefault();
		socket.emit("newPost", {
			id: Math.random(),
			title,
			content,
			likes: 0,
		});
		setContent("");
		setTitle("");
	};
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

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const EditTodo = ({ socket }) => {
	const { id } = useParams();
	const [todo, setTodo] = useState("id");
	const navigate = useNavigate();

	useEffect(() => {
		socket.emit("editTodo", id);
		socket.on("gotTodo", (data) => setTodo(data.todo));
	}, [id, socket]);

	const updateTodo = (e) => {
		e.preventDefault();
		socket.emit("addTodo", { id, todo });
		setTodo("");
		navigate("/");
	};

	return (
		<div>
			<Nav />
			<div className='edit__container'>
				<h2 className='edit__header'>Edit Todo</h2>
				<form className='form' onSubmit={updateTodo}>
					<input
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
						className='input'
					/>
					<button className='form__cta'>UPDATE TODO</button>
				</form>
			</div>
		</div>
	);
};

export default EditTodo;

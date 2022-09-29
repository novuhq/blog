import React from "react";
import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EditTodo from "./components/EditTodo";
const socket = socketIO.connect("http://localhost:4000");

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home socket={socket} />} />
				<Route path='/edit/:id' element={<EditTodo socket={socket} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

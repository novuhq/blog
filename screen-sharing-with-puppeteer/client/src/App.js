import React from "react";
import socketIO from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Channel from "./components/Channel";
import Login from "./components/Login";
const socket = socketIO.connect("http://localhost:4000");

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home socket={socket} />} />
			<Route path='/channel/:channel' element={<Channel socket={socket} />} />
			<Route path='/login' element={<Login socket={socket} />} />
		</Routes>
	);
};

export default App;

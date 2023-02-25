import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Replies from "./components/Replies";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/dashboard' element={<Home />} />
					<Route path='/:id/replies' element={<Replies />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import BookUser from "./components/BookUser";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/profile/:id' element={<Profile />} />
					<Route path='/book/:user' element={<BookUser />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
};

export default App;

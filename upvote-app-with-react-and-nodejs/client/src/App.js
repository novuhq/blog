import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photos from "./components/Photos";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadPhoto from "./components/UploadPhoto";
import MyPhotos from "./components/MyPhotos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharePhoto from "./components/SharePhoto";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/photos' element={<Photos />} />
					<Route path='/photo/upload' element={<UploadPhoto />} />
					<Route path='/user/photos' element={<MyPhotos />} />
					<Route path='/share/:user' element={<SharePhoto />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</>
	);
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPost from "./components/BlogPost";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Login from "./components/Login";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login socket={socket} />} />
				<Route path='/dashboard' element={<Home socket={socket} />} />
				<Route path='/post/create' element={<CreatePost socket={socket} />} />
				<Route path='/post/:id' element={<BlogPost socket={socket} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

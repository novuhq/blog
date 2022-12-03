import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import PhotoContainer from "./PhotoContainer";

const Home = ({ socket }) => {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem("_id") && !localStorage.getItem("_myEmail")) {
			navigate("/");
		}
	}, [navigate]);

	useEffect(() => {
		socket.emit("allPhotos", "search");
		socket.on("allPhotosMessage", (data) => {
			setPhotos(data.photos);
		});
	}, [socket]);

	return (
		<div>
			<Nav />
			<PhotoContainer photos={photos} socket={socket} />
		</div>
	);
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";

const SharePhoto = ({ socket }) => {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState([]);
	const { user } = useParams();

	useEffect(() => {
		function authenticateUser() {
			const id = localStorage.getItem("_id");
			if (!id) {
				navigate("/");
			} else {
				socket.emit("sharePhoto", user);
			}
		}
		authenticateUser();
	}, [socket, navigate, user]);

	useEffect(() => {
		socket.on("sharePhotoMessage", (data) => setPhotos(data));
	}, [socket]);

	return (
		<div>
			<Nav />
			<PhotoContainer socket={socket} photos={photos} />
		</div>
	);
};

export default SharePhoto;

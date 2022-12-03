import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhotoContainer from "./PhotoContainer";

const Home = () => {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!localStorage.getItem("_id")) {
			navigate("/");
		}
	}, [navigate]);

	useEffect(() => {
		function fetchPhotos() {
			axios
				.get("http://localhost:4000/photo/all")
				.then((data) => {
					setPhotos(data.data.photos);
					setLoading(false);
				})
				.catch((err) => console.error(err));
		}
		fetchPhotos();
	}, []);

	return (
		<div>
			<Nav />
			<PhotoContainer loading={loading} photos={photos} />
		</div>
	);
};

export default Home;

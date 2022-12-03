import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";

const SharePhoto = () => {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useParams();

	useEffect(() => {
		function authenticateUser() {
			const id = localStorage.getItem("_id");
			if (!id) {
				navigate("/");
			} else {
				axios
					.get(`http://localhost:4000/photo/share/${user}`)
					.then((res) => {
						setPhotos(res.data.data);
						setLoading(false);
					})
					.catch((err) => console.error(err));
			}
		}
		authenticateUser();
	}, [navigate, user]);

	return (
		<div>
			<Nav />

			<PhotoContainer loading={loading} photos={photos} />
		</div>
	);
};

export default SharePhoto;

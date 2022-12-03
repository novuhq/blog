import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PhotoContainer from "./PhotoContainer";

const MyPhotos = () => {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userLink, setUserLink] = useState("");

	const handleSignOut = () => {
		localStorage.removeItem("_id");
		navigate("/");
	};

	const copyToClipBoard = () => alert(`Copied ✅`);

	useEffect(() => {
		function authenticateUser() {
			const id = localStorage.getItem("_id");
			if (!id) {
				navigate("/");
			} else {
				axios
					.get(`http://localhost:4000/photo/user/${id}`)
					.then((res) => {
						setPhotos(res.data.data);
						setLoading(false);
						setUserLink(`http://localhost:3000/share/${res.data.username}`);
					})
					.catch((err) => console.error(err));
			}
		}
		authenticateUser();
	}, [navigate]);

	return (
		<div>
			<nav className='navbar'>
				<h3>PhotoShare</h3>

				<div className='nav__BtnGroup'>
					<Link to='/photo/upload'>Upload Photo</Link>
					<button onClick={handleSignOut}>Sign out</button>
				</div>
			</nav>
			{!loading && (
				<div className='copyDiv'>
					<CopyToClipboard
						text={userLink}
						onCopy={copyToClipBoard}
						className='copyContainer'
					>
						<span className='shareLink'>Copy your share link</span>
					</CopyToClipboard>
				</div>
			)}

			<PhotoContainer loading={loading} photos={photos} />
		</div>
	);
};

export default MyPhotos;

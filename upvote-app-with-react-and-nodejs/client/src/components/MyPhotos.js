import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PhotoContainer from "./PhotoContainer";

const MyPhotos = ({ socket }) => {
	const navigate = useNavigate();
	const [photos, setPhotos] = useState([]);
	const [userLink, setUserLink] = useState("");

	const handleSignOut = () => {
		localStorage.removeItem("_id");
		localStorage.removeItem("_myEmail");
		navigate("/");
	};

	const copyToClipBoard = () => alert(`Copied ✅`);

	useEffect(() => {
		function authenticateUser() {
			const id = localStorage.getItem("_id");
			if (!id) {
				navigate("/");
			} else {
				socket.emit("getMyPhotos", id);
			}
		}
		authenticateUser();
	}, [navigate, socket]);
	useEffect(() => {
		socket.on("getMyPhotosMessage", (data) => {
			setPhotos(data.data);
			setUserLink(`http://localhost:3000/share/${data.username}`);
		});
	}, [socket]);
	return (
		<div>
			<nav className='navbar'>
				<h3>PhotoShare</h3>

				<div className='nav__BtnGroup'>
					<Link to='/photo/upload'>Upload Photo</Link>
					<button onClick={handleSignOut}>Sign out</button>
				</div>
			</nav>

			<div className='copyDiv'>
				<CopyToClipboard
					text={userLink}
					onCopy={copyToClipBoard}
					className='copyContainer'
				>
					<span className='shareLink'>Copy your share link</span>
				</CopyToClipboard>
			</div>

			<PhotoContainer socket={socket} photos={photos} />
		</div>
	);
};

export default MyPhotos;

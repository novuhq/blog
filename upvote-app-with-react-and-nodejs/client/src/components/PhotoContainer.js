import axios from "axios";
import React from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { toast } from "react-toastify";

const PhotoContainer = ({ loading, photos }) => {
	const handleUpvote = (id) => {
		axios
			.post("http://localhost:4000/photo/upvote", {
				userID: localStorage.getItem("_id"),
				photoID: id,
			})
			.then((res) => {
				if (res.data.message) {
					toast.success(res.data.message);
				} else {
					toast.error(res.data.error_message);
				}
			})
			.catch((err) => console.error(err));
	};
	return (
		<main className='photoContainer'>
			{!loading ? (
				photos.map((photo) => (
					<div className='photo' key={photo.id}>
						<div className='imageContainer'>
							<img
								src={photo.image_url}
								alt={photo.id}
								className='photo__image'
							/>
						</div>

						<button
							className='upvoteIcon'
							onClick={() => handleUpvote(photo.id)}
						>
							<MdOutlineArrowUpward
								style={{ fontSize: "20px", marginBottom: "5px" }}
							/>
							<p style={{ fontSize: "12px", color: "#ce7777" }}>
								{photo.vote_count}
							</p>
						</button>
					</div>
				))
			) : (
				<p>Loading</p>
			)}
		</main>
	);
};

export default PhotoContainer;

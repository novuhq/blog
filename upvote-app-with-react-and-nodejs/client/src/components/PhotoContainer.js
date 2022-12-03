import axios from "axios";
import React from "react";
import { MdOutlineArrowUpward } from "react-icons/md";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const PhotoContainer = ({ loading, photos }) => {
	const sendEmail = (owner_email) => {
		emailjs
			.send(
				'YOUR_SERVICE_ID',
				'YOUR_TEMPLATE_ID',
				{
					to_email: owner_email,
					from_email: localStorage.getItem("_myEmail"),
				},
				'YOUR_PUBLIC_KEY'
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	};

	const handleUpvote = (id) => {
		axios
			.post("http://localhost:4000/photo/upvote", {
				userID: localStorage.getItem("_id"),
				photoID: id,
			})
			.then((res) => {
				if (res.data.message) {
					toast.success(res.data.message);
					sendEmail(res.data.item[0]._ref);
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

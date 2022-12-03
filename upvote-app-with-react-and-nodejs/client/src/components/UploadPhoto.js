import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UploadPhoto = () => {
	const navigate = useNavigate();
	const [photo, setPhoto] = useState(null);

	useEffect(() => {
		if (!localStorage.getItem("_id")) {
			navigate("/");
		}
	}, [navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = localStorage.getItem("_id");
		const formData = new FormData();
		formData.append("fileImage", photo, photo.name);
		formData.append("_id", id);
		axios
			.post("http://localhost:4000/photo/upload", formData, {})
			.then((res) => {
				if (res.error_message) {
					toast.error(res.error_message);
				} else {
					toast.success(res.message);
					navigate("/photos");
				}
			});
		e.preventDefault();
	};

	return (
		<main className='uploadContainer'>
			<div className='uploadText'>
				<h2>Upload Image</h2>
				<form
					method='POST'
					onSubmit={handleSubmit}
					encType='multipart/form-data'
				>
					<label>Select File</label>
					<input
						type='file'
						accept='image/*'
						name='fileImage'
						id='fileImage'
						onChange={(e) => setPhoto(e.target.files[0])}
					/>
					<button className='uploadBtn'>UPLOAD</button>
				</form>
			</div>
		</main>
	);
};

export default UploadPhoto;

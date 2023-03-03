import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const SendResume = () => {
	const [companyName, setCompanyName] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [companyDescription, setCompanyDescription] = useState("");
	const [recruiterName, setRecruiterName] = useState("");
	const [recruiterEmail, setRecruiterEmail] = useState("");
	const [myEmail, setMyEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const sendEmailResume = () => {
		setLoading(true);
		axios
			.post("http://localhost:4000/resume/send", {
				recruiterName,
				jobTitle,
				recruiterEmail,
				companyName,
				companyDescription,
				myEmail,
			})
			.then((res) => {
				if (res.data.message) {
					const {
						cover_letter,
						recruiter_email,
						my_email,
						applicant_name,
					} = res.data;
					emailjs
						.send(
							"<SERVICE_ID>",
							"<TEMPLATE_ID>",
							{
								cover_letter,
								applicant_name,
								recruiter_email,
								my_email,
							},
							"<PUBLIC_KEY>"
						)
						.then((res) => {
							if (res.status === 200) {
								setLoading(false);
								alert("Message sent!");
								navigate("/");
							}
						})
						.catch((err) => console.error(err));
				}
			})
			.catch((err) => console.error(err));
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		sendEmailResume();
		setMyEmail("");
		setRecruiterEmail("");
		setRecruiterName("");
		setJobTitle("");
		setCompanyName("");
		setCompanyDescription("");
	};

	if (loading) {
		return <Loading />;
	}
	return (
		<div className='app'>
			<h1 className='resume__title'>Send an email</h1>
			<form onSubmit={handleFormSubmit} encType='multipart/form-data'>
				<div className='nestedContainer'>
					<div className='nestedItem'>
						<label htmlFor='recruiterName'>Recruiter's Name</label>
						<input
							type='text'
							value={recruiterName}
							required
							onChange={(e) => setRecruiterName(e.target.value)}
							id='recruiterName'
							className='recruiterName'
						/>
					</div>
					<div className='nestedItem'>
						<label htmlFor='recruiterEmail'>Recruiter's Email Address</label>
						<input
							type='email'
							value={recruiterEmail}
							required
							onChange={(e) => setRecruiterEmail(e.target.value)}
							id='recruiterEmail'
							className='recruiterEmail'
						/>
					</div>
				</div>
				<div className='nestedContainer'>
					<div className='nestedItem'>
						<label htmlFor='myEmail'>Your Email Address </label>
						<input
							type='email'
							value={myEmail}
							required
							onChange={(e) => setMyEmail(e.target.value)}
							id='myEmail'
							className='myEmail'
						/>
					</div>
					<div className='nestedItem'>
						<label htmlFor='jobTitle'>Position Applying For</label>
						<input
							type='text'
							value={jobTitle}
							required
							onChange={(e) => setJobTitle(e.target.value)}
							id='jobTitle'
							className='jobTitle'
						/>
					</div>
				</div>

				<label htmlFor='companyName'>Company Name</label>
				<input
					type='text'
					value={companyName}
					required
					onChange={(e) => setCompanyName(e.target.value)}
					id='companyName'
					className='companyName'
				/>
				<label htmlFor='companyDescription'>Company Description</label>
				<textarea
					rows={5}
					className='companyDescription'
					required
					value={companyDescription}
					onChange={(e) => setCompanyDescription(e.target.value)}
				/>

				<button className='sendEmailBtn'>SEND EMAIL</button>
			</form>
		</div>
	);
};

export default SendResume;

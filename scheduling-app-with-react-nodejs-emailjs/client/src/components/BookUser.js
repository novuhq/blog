import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { sendEmail } from "../utils/resource";
import { fetchBookingDetails } from "../utils/resource";

const BookUser = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [schedules, setSchedules] = useState([]);
	const [timezone, setTimezone] = useState("");
	const [duration, setDuration] = useState("");
	const [error, setError] = useState(false);
	const [receiverEmail, setReceiverEmail] = useState("");

	const { user } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		sendEmail(receiverEmail, email, fullName, message, duration);
		setFullName("");
		setMessage("");
	};

	useEffect(() => {
		fetchBookingDetails(
			user,
			setError,
			setTimezone,
			setSchedules,
			setReceiverEmail
		);
	}, [user]);

	if (error) {
		return <ErrorPage error="User doesn't exist" />;
	}
	return (
		<div className='bookContainer'>
			<h2 className='bookTitle'>Book a session with {user}</h2>
			<form onSubmit={handleSubmit} className='booking__form'>
				<label htmlFor='fullName'>Full Name</label>
				<input
					id='fullName'
					name='fullName'
					type='text'
					required
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
				<label htmlFor='email'>Email Address</label>
				<input
					id='email'
					name='email'
					required
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor='message'>Any important note? (optional)</label>
				<textarea
					rows={5}
					name='message'
					id='message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

				<label htmlFor='session'>
					Select your preferred session - {timezone}
				</label>
				<select name='duration' onChange={(e) => setDuration(e.target.value)}>
					{schedules.map((schedule) => (
						<option
							value={`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}
							key={schedule.day}
						>{`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}</option>
					))}
				</select>
				<button className='bookingBtn'>SEND</button>
			</form>
		</div>
	);
};

export default BookUser;

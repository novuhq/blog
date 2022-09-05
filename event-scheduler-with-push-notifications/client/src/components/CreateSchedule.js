import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateSchedule = ({ socket }) => {
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [title, setTitle] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		socket.emit("newSchedule", { hour, minute, title });
		toast.success(`${title} has been added successfully!`);
		console.log({ hour, minute, title });
		setHour("");
		setMinute("");
		setTitle("");
	};
	return (
		<div className='createSchedule__container'>
			<h2>Create a Schedule</h2>
			<form onSubmit={handleSubmit}>
				<div className='title__container'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						id='title'
						value={title}
						required
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor='hour'>Select Hour</label>
					<input
						type='number'
						min={0}
						max={23}
						name='hour'
						id='hour'
						value={hour}
						onChange={(e) => setHour(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor='minute'>Select Minute</label>
					<input
						type='number'
						min={0}
						max={59}
						name='minute'
						id='minute'
						value={minute}
						onChange={(e) => setMinute(e.target.value)}
						required
					/>
				</div>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default CreateSchedule;

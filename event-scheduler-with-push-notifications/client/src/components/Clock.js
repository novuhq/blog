import React, { useState, useEffect } from "react";

const Clock = () => {
	const [date, setDate] = useState(new Date());

	const refreshClock = () => setDate(new Date());

	useEffect(() => {
		const timerId = setInterval(refreshClock, 1000);
		return () => clearInterval(timerId);
	}, []);

	return (
		<div className='clock__container'>
			<h2 className='clock'>{date.toLocaleTimeString()}</h2>
		</div>
	);
};

export default Clock;

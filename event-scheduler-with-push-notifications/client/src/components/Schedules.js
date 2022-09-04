import React from "react";

const Schedules = ({ schedules }) => {
	return (
		<div>
			<h2>Upcoming Events</h2>
			<ul>
				{schedules?.map((schedule) => (
					<li key={schedule.title}>
						{schedule.title} - {schedule.hour} : {schedule.minute}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Schedules;

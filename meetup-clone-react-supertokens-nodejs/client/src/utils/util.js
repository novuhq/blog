export const fetchEvents = (setEvents) => {
	fetch("http://localhost:4000/events")
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				setEvents(data.events);
			}
		})
		.catch((err) => console.error(err));
};
export const generateID = () => Math.random().toString(36).substring(2, 10);
export const slugToSentence = (slug) => {
	const words = slug.split("-");
	const sentence = words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return sentence;
};

export const fetchEventBySlug = (slug, setEvent) => {
	fetch("http://localhost:4000/event/slug", {
		method: "POST",
		body: JSON.stringify({ slug }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				console.log(data.event);
				setEvent(data.event);
			}
		})
		.catch((err) => console.error(err));
};

export const fetchEventByCategory = (category, setEvents) => {
	fetch("http://localhost:4000/event/category", {
		method: "POST",
		body: JSON.stringify({ category }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				console.log(data.events);
				setEvents(data.events);
			}
		})
		.catch((err) => console.error(err));
};

export const postNewComment = (comment, user, slug) => {
	fetch("http://localhost:4000/event/comment", {
		method: "POST",
		body: JSON.stringify({ comment, user, slug }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				alert(data.message);
			}
		})
		.catch((err) => console.error(err));
};

export const postNewEvent = (
	title,
	location,
	category,
	startTime,
	description,
	host,
	navigate
) => {
	fetch("http://localhost:4000/create/event", {
		method: "POST",
		body: JSON.stringify({
			title,
			location,
			category,
			startTime,
			description,
			host,
		}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				alert(data.message);
				navigate("/dashboard");
			}
		})
		.catch((err) => console.error(err));
};

export const postRegisterForEvent = (user, id, navigate) => {
	fetch("http://localhost:4000/register/event", {
		method: "POST",
		body: JSON.stringify({ user, id }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				alert(data.message);
				navigate("/");
			}
		})
		.catch((err) => console.error(err));
};

export const fetchMyEvents = (userID, setEvents) => {
	fetch("http://localhost:4000/user/events", {
		method: "POST",
		body: JSON.stringify({ userID }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				console.log(data);
				setEvents(data.events);
			}
		})
		.catch((err) => console.error(err));
};

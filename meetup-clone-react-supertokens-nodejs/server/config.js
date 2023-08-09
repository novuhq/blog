const { Novu } = require("@novu/node");
const novu = new Novu("cdaa6070dfc6e6edf820515f19a90627");

const createSlug = (text) => {
	let slug = text
		.trim()
		.toLowerCase()
		.replace(/[^\w\s-]/g, "");
	slug = slug.replace(/\s+/g, "-");
	return slug;
};
const generateID = () => Math.random().toString(36).substring(2, 10);

const addCommentNotification = async (userID) => {
	await novu.subscribers.identify(userID, {
		firstName: "inAppSubscriber",
	});
	const response = await novu.trigger("newComment", {
		to: {
			subscriberId: "62d1fc97bbe3160014a8cb23",
		},
	});
	return response.data.data;
};

const newRegistrationNotification = async (userID) => {
	await novu.subscribers.identify(userID, {
		firstName: "inAppSubscriber",
	});
	const response = await novu.trigger("newRegistration", {
		to: {
			subscriberId: "62d1fc97bbe3160014a8cb23",
		},
	});
	return response.data.data;
};

const newEventNotification = async (eventTitle, category) => {
	const response = await novu.trigger("newEvent", {
		to: {
			subscriberId: "62d1fc97bbe3160014a8cb23",
		},
		payload: {
			title: eventTitle,
			category,
		},
	});
	return response.data.data;
};

module.exports = {
	newRegistrationNotification,
	addCommentNotification,
	createSlug,
	generateID,
	newEventNotification,
};

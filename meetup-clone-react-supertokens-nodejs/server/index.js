const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const {
	createSlug,
	generateID,
	addCommentNotification,
	newRegistrationNotification,
	newEventNotification,
} = require("./config");

const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const { middleware } = require("supertokens-node/framework/express");
const { errorHandler } = require("supertokens-node/framework/express");
const {
	verifySession,
} = require("supertokens-node/recipe/session/framework/express");

supertokens.init({
	framework: "express",
	supertokens: {
		connectionURI:
			"<YOUR_CONNECTION_URI>",
		apiKey: "<YOUR_SUPERTOKENS_API_KEY>",
	},
	appInfo: {
		appName: "meetup-clone",
		apiDomain: "http://localhost:4000",
		websiteDomain: "http://localhost:5173",
		apiBasePath: "/auth",
		websiteBasePath: "/",
	},
	recipeList: [
		EmailPassword.init(), // initializes signin / sign up features
		Session.init(), // initializes session features
	],
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
		credentials: true,
	})
);

app.use(middleware());

const events = [
	{
		id: generateID(),
		title: "Novu Community Call",
		slug: "novu-community-call",
		host: "Novu Development Team",
		category: "social-activities",
		start_time: "8:00pm",
		location: "Online (Discord Channel)",
		comments: [
			{ user: "nevodavid", id: generateID(), comment: "Can't wait!😍" },
			{ user: "emil_pearce", id: generateID(), comment: "Let's go!🚀" },
		],
		attendees: [
			"nevodavid",
			"emil_pearce",
			"tomer_barnea",
			"unicodeveloper",
			"scopsy",
		],
		description:
			"Dear attendee,\n We hope this message finds you well! We're excited to invite you to our upcoming Novu Community Call, where we will come together to share insights, updates, and engage in meaningful discussions. Your presence and contributions are highly valued as we continue to grow and strengthen our vibrant Novu community.",
	},
	{
		id: generateID(),
		title: "Novu Team Hangout",
		slug: "novu-team-hangout",
		host: "Novu Team",
		category: "social-activities",
		start_time: "12:30pm",
		location: "Online (Google Meet)",
		comments: [
			{ user: "nevodavid", id: generateID(), comment: "Can't wait!😍" },
			{ user: "emil_pearce", id: generateID(), comment: "Let's go!🚀" },
		],
		attendees: ["nevodavid", "tomer_barnea", "unicodeveloper", "scopsy"],
		description:
			"Dear attendee,\n We hope this message finds you well! We're excited to invite you to our upcoming Novu Community Call, where we will come together to share insights, updates, and engage in meaningful discussions. Your presence and contributions are highly valued as we continue to grow and strengthen our vibrant Novu community.",
	},
	{
		id: generateID(),
		title: "General Prayer",
		slug: "general-prayer",
		host: "Church of Christ",
		category: "religion",
		start_time: "5:00am",
		location: "Online (Zoom meeting)",
		comments: [{ user: "nevodavid", id: generateID(), comment: "🙏🏽🙏🏽" }],
		attendees: ["nevodavid"],
		description:
			"This gathering aims to create a serene and inclusive space where we can come together as a community to offer prayers, reflect, and find solace in each other's company. It's a time to connect with our inner selves, share positive energy, and uplift one another through our thoughts and intentions.",
	},
];

app.get("/session", verifySession(), async (req, res) => {
	let session = req.session;
	res.send({
		sessionHandle: session.getHandle(),
		userId: session.getUserId(),
		accessTokenPayload: session.getAccessTokenPayload(),
	});
});

app.get("/events", (req, res) => {
	res.json({
		message: "Success!",
		events,
	});
});

app.post("/event/slug", (req, res) => {
	const { slug } = req.body;
	const result = events.filter((e) => e.slug === slug);
	res.json({ message: "Success!", event: result[0] });
});

app.post("/event/category", (req, res) => {
	const { category } = req.body;
	const result = events.filter((e) => e.category === category);
	res.json({ message: "Success!", events: result });
});

app.post("/create/event", async (req, res) => {
	const { title, location, startTime, category, description, host } = req.body;
	const eventObject = {
		id: generateID(),
		title,
		slug: createSlug(title),
		host,
		category,
		start_time: startTime,
		location,
		comments: [],
		attendees: [],
		description,
	};
	events.unshift(eventObject);
	const sendNotification = await newEventNotification(title, category);
	if (sendNotification.acknowledged) {
		res.json({ message: "Event added successfully!✅" });
	}
});

app.post("/event/comment", async (req, res) => {
	const { comment, user, slug } = req.body;
	for (let i = 0; i < events.length; i++) {
		if (events[i].slug === slug) {
			events[i].comments.unshift({
				user,
				id: generateID(),
				comment,
			});
			const sendNotification = await addCommentNotification(user);
			if (sendNotification.acknowledged) {
				return res.json({ message: "Comment added successfully!✅" });
			}
		}
	}
});

app.post("/register/event", async (req, res) => {
	const { user, id } = req.body;
	for (let i = 0; i < events.length; i++) {
		if (events[i].id === id) {
			const validate = events[i].attendees.filter((person) => person === user);
			if (validate.length === 0) {
				events[i].attendees.push(user);
				const sendNotification = await newRegistrationNotification(user);
				if (sendNotification.acknowledged) {
					return res.json({ message: "Registered successfully!✅" });
				}
			} else {
				return res.json({ message: "You cannot register twice ❌" });
			}
		}
	}
});

app.post("/user/events", (req, res) => {
	const { userID } = req.body;
	let userEvents = [];
	for (let i = 0; i < events.length; i++) {
		let result = events[i].attendees.filter((user) => user === userID);
		if (result.length > 0) {
			userEvents.push(events[i]);
		}
	}
	res.json({ message: "Successful", events: userEvents });
});

app.use(errorHandler());

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const fs = require("fs");
const multer = require("multer");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const generateID = () => Math.random().toString(36).substring(2, 10);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 5 },
});

const database = [];

app.post("/login", (req, res) => {
	const { username, password } = req.body;
	let result = database.filter(
		(user) => user.username === username && user.password === password
	);
	if (result.length !== 1) {
		return res.json({
			error_message: "Incorrect credentials",
		});
	}
	res.json({
		message: "Login successfully",
		data: {
			_id: result[0].id,
			_email: result[0].email,
		},
	});
});

app.post("/register", (req, res) => {
	const { username, email, password } = req.body;
	let result = database.filter(
		(user) => user.email === email || user.username === username
	);
	if (result.length === 0) {
		database.push({ id: generateID(), username, password, email, images: [] });
		return res.json({
			message: "Account created successfully!",
		});
	}
	res.json({
		error_message: "User already exists",
	});
});

app.post("/photo/upload", upload.single("fileImage"), (req, res) => {
	let result = database.filter((user) => user.id === req.body._id);
	const newImage = {
		id: generateID(),
		image_url: `http://localhost:4000/uploads/${req.file.filename}`,
		vote_count: 0,
		votedUsers: [],
		_ref: req.body._email,
	};

	result[0]?.images.unshift(newImage);

	res.json({
		message: "Image upload Successfully",
	});
});

app.get("/photo/all", (req, res) => {
	let images = [];
	for (let i = 0; i < database.length; i++) {
		images = images.concat(database[i]?.images);
	}
	res.json({ message: "Photos retrieved successfully", photos: images });
});

app.get("/photo/user/:id", (req, res) => {
	const { id } = req.params;
	let result = database.filter((db) => db.id === id);
	res.json({
		message: "Photos retrieved successfully",
		data: result[0]?.images,
		username: result[0]?.username,
	});
});

app.get("/photo/share/:name", (req, res) => {
	const { name } = req.params;
	let result = database.filter((db) => db.username === name);
	res.json({
		message: "Photos retrieved successfully",
		data: result[0]?.images,
	});
});

app.post("/photo/upvote", (req, res) => {
	const { userID, photoID } = req.body;

	let images = [];
	for (let i = 0; i < database.length; i++) {
		if (!(database[i].id === userID)) {
			images = images.concat(database[i]?.images);
		}
	}

	//checking the images for the one with the same id
	const item = images.filter((image) => image.id === photoID);

	if (item.length < 1) {
		return res.json({ error_message: "You cannot upvote your photos" });
	}
	//Getting the list of voted users
	const voters = item[0]?.votedUsers;
	//Authenticating the vote
	const authenticateUpvote = voters.filter((voter) => voter === userID);
	//checks if the user has not voted before
	if (!authenticateUpvote.length) {
		item[0].vote_count += 1;
		voters.push(userID);
		return res.json({ message: "Upvote successful", item });
	}
	//nullifies duplicate votes
	res.json({ error_message: "Duplicate votes are not allowed" });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

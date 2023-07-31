const express = require("express");
const cors = require("cors");
const { Novu } = require("@novu/node");
const app = express();
const PORT = 4000;

const novu = new Novu("cdaa6070dfc6e6edf820515f19a90627");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let posts = [
	{
		u_id: "a123",
		post_id: "1",
		title: "Building a chat app with NextJS and Novu",
		slug: "building-a-chat-app-with-nextjs-and-novu",
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infan",
		published_date: "27-07-2023",
		likes: [{ u_id: "12345" }, { u_id: "ancsd" }],
		dislikes: [{ user_id: "12345" }, { u_id: "12345" }],
	},
	{
		u_id: "b123",
		post_id: "2",
		title: "How to create a ecommerce app with NextJS and Novu ",
		slug: "how-to-create-a-ecommerce-app-with-nextjs-and-novu",
		content:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infan",
		published_date: "27-07-2023",
		likes: [{ u_id: "12345" }],
		dislikes: [{ user_id: "12345" }],
	},
];

const createSlug = (text, id) => {
	let slug = text
		.trim()
		.toLowerCase()
		.replace(/[^\w\s-]/g, "");
	slug = slug.replace(/\s+/g, "-");
	return slug + "-" + id;
};
const generateID = () => Math.random().toString(36).substring(2, 10);

const notify = async (reaction, userID) => {
	await novu.subscribers.identify(userID, {
		firstName: "inAppSubscriber",
	});
	const response = await novu.trigger("notify", {
		to: {
			subscriberId: "62d1fc97bbe3160014a8cb23",
		},
		payload: {
			reaction,
		},
	});
	return response.data.data;
};

app.get("/posts", (req, res) => {
	res.json({
		posts,
	});
});

app.post("/post/details", (req, res) => {
	const { slug } = req.body;
	const result = posts.filter((post) => post.slug === slug);
	res.json({ post: result[0] });
});

app.post("/post/react", async (req, res) => {
	const { slug, type, u_id } = req.body;
	for (let i = 0; i < posts.length; i++) {
		if (posts[i].slug === slug && type === "like") {
			const validateLike = posts[i].likes.filter(
				(likes) => likes.u_id === u_id
			);
			if (validateLike.length === 0) {
				posts[i].likes.push({ u_id });
				const sendNotifcation = await notify("liked", u_id);
				if (sendNotifcation.acknowledged) {
					res.json({ message: "You've just liked a post" });
				}
			}
		}
		if (posts[i].slug === slug && type === "dislike") {
			const validateDislike = posts[i].dislikes.filter(
				(dislikes) => dislikes.u_id === u_id
			);
			if (validateDislike.length === 0) {
				posts[i].dislikes.push({ u_id });
				const sendNotifcation = await notify("liked", u_id);
				if (sendNotifcation.acknowledged) {
					res.json({ message: "You've just disliked a post" });
				}
			}
		}
	}
});

app.post("/post/add", (req, res) => {
	const { u_id, title, content, date } = req.body;
	const postObject = {
		u_id,
		post_id: generateID(),
		title,
		slug: createSlug(title, generateID()),
		content,
		published_date: date,
		likes: [],
		dislikes: [],
	};
	posts.unshift(postObject);
	res.json({ message: "Post added successfully!✅" });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

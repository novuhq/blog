export const formatDate = () => {
	const date = new Date();
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
};

export const addNewPost = (u_id, title, content, date, navigate) => {
	fetch("http://localhost:4000/post/add", {
		method: "POST",
		body: JSON.stringify({ u_id, title, content, date }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json(res))
		.then((data) => {
			alert(data.message);
			console.log(data);
			navigate("/");
		})
		.catch((err) => {
			console.error(err);
			alert("Encountered an error ❌");
		});
};

export const fetchPostContent = (slug, setLoading, setPost) => {
	fetch("http://localhost:4000/post/details", {
		method: "POST",
		body: JSON.stringify({ slug: slug }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json(res))
		.then((data) => {
			setLoading(false);
			setPost(data.post);
		})
		.catch((err) => console.error(err));
};

export const postReaction = (slug, type) => {
	fetch("http://localhost:4000/post/react", {
		method: "POST",
		body: JSON.stringify({ slug, type, u_id: localStorage.getItem("u_id") }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json(res))
		.then((data) => alert(data.message))
		.catch((err) => console.error(err));
};

export const fetchAllPosts = (setLoading, setPosts) => {
	fetch("http://localhost:4000/posts")
		.then((res) => res.json())
		.then((data) => {
			setLoading(false);
			setPosts(data.posts);
		})
		.catch((err) => console.error(err));
};

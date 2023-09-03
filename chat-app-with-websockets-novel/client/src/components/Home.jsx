import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { Editor } from "novel";
import "novel/styles.css";

const Home = ({ socket }) => {
	const { isLoaded, userId } = useAuth();
	const [value, setValue] = useState([]);
	const [messages, setMessages] = useState([]);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [write, setWrite] = useState(false);
	const writeFunction = () => setWrite(true);
	const lastMessageRef = useRef(null);

	const handleSubmit = () => {
		socket.emit("message", {
			value,
			userId: userId.slice(0, 10),
		});
		setWrite(false);
	};

	const updateMessage = (array) => {
		const elements = [];
		for (let i = 0; i < array.length; i++) {
			if (array[i].type === "paragraph" || array[i].type === "heading") {
				elements.push(array[i].content[0].text);
			}
		}
		return elements.join("\n");
	};

	useEffect(() => {
		socket.on("messageResponse", (data) => {
			setMessages([...messages, data]);
			if (!onlineUsers.includes(data.userId)) {
				setOnlineUsers([...onlineUsers, data.userId]);
			}
		});
	}, [socket, messages, onlineUsers]);

	useEffect(() => {
		// 👇️ scroll to bottom every time messages change
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// In case the user signs out while on the page.
	if (!isLoaded || !userId) {
		return null;
	}

	return (
		<div>
			<nav className='navbar'>
				<Link to='/' className='logo'>
					Mingle
				</Link>
				<SignOutButton signOutCallback={() => console.log("Signed out!")}>
					<button className='signOutBtn'>Sign out</button>
				</SignOutButton>
			</nav>

			{!write ? (
				<main className='chat'>
					<div className='chat__body'>
						<div className='chat__content'>
							{messages.map((message, index) =>
								message.userId === userId.slice(0, 10) ? (
									<div style={{ float: "right", margin: "7px 0" }} key={index}>
										<p style={{ textAlign: "right", fontSize: "13px" }}>
											{message.userId}
										</p>
										<div className='sender__message'>{message.value}</div>
									</div>
								) : (
									<div style={{ margin: "7px 0" }} key={index}>
										<p style={{ fontSize: "13px" }}>{message.userId}</p>
										<div className='recipient__message'>{message.value}</div>
									</div>
								)
							)}
							<div ref={lastMessageRef} />
						</div>
						<div className='chat__input'>
							<div className='chat__form'>
								<button className='createBtn' onClick={writeFunction}>
									Write message
								</button>
							</div>
						</div>
					</div>
					<aside className='chat__bar'>
						<h3>Active users</h3>
						<ul>
							{onlineUsers.map((user) => (
								<li key={user}>{user}</li>
							))}
						</ul>
					</aside>
				</main>
			) : (
				<main className='editor'>
					<header className='editor__header'>
						<button className=' editorBtn' onClick={handleSubmit}>
							SEND MESSAGE
						</button>
					</header>

					<div className='editor__container'>
						<Editor onUpdate={(e) => setValue(updateMessage(e.content))} />
					</div>
				</main>
			)}
		</div>
	);
};

export default Home;

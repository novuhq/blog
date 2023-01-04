import React, { useState, useEffect } from "react";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [subscriber, setSubscriber] = useState("");
	const [subscribers, setSubscribers] = useState([
		{ firstName: "", lastName: "", subscriberId: "Select", _id: "null" },
	]);

	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);

	const handleSubmit = (e) => {
		e.preventDefault();
		sendNotification();
		setMessage("");
		setSubscriber("");
	};

	async function sendNotification() {
		try {
			const request = await fetch("http://localhost:4000/notify", {
				method: "POST",
				body: JSON.stringify({
					message,
					subscriber,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await request.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		async function fetchSubscribers() {
			try {
				const request = await fetch("http://localhost:4000/subscribers");
				const response = await request.json();
				setSubscribers([...subscribers, ...response]);
			} catch (err) {
				console.error(err);
			}
		}
		fetchSubscribers();
	}, []);

	return (
		<div className='home'>
			<nav className='navbar'>
				<h2>Notify</h2>
				<NovuProvider
					subscriberId={"<YOUR_SUBSCRIBER_ID>"}
					applicationIdentifier={"<YOUR_APP_ID>"}
				>
					<PopoverNotificationCenter onNotificationClick={onNotificationClick}>
						{({ unseenCount }) => (
							<NotificationBell unseenCount={unseenCount} colorScheme='light' />
						)}
					</PopoverNotificationCenter>
				</NovuProvider>
			</nav>
			<main className='homeContainer'>
				<h3>Send notifications to your users</h3>
				<form
					className='notification__form'
					onSubmit={handleSubmit}
					method='POST'
				>
					<label htmlFor='title'>Notification Title</label>
					<textarea
						rows={5}
						name='title'
						required
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder='Let the user know that'
					/>
					<label htmlFor='subscriber'>Subscribers</label>

					<select
						value={subscriber}
						name='subscriber'
						onChange={(e) => setSubscriber(e.target.value)}
					>
						{subscribers.map((s) => (
							<option
								key={s._id}
								value={`${s.firstName} ${s.lastName} - ${s.subscriberId}`}
							>{`${s.firstName} ${s.lastName} - ${s.subscriberId}`}</option>
						))}
					</select>
					<button>SEND NOTIFICATION</button>
				</form>
			</main>
		</div>
	);
};

export default Home;

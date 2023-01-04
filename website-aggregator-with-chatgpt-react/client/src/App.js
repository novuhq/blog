import React, { useState } from "react";
import Loading from "./Loading";

const App = () => {
	const [url, setURL] = useState("");
	const [loading, setLoading] = useState(false);
	const [websiteContent, setWebsiteContent] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setURL("");
		sendURL();
	};

	async function sendURL() {
		try {
			const request = await fetch("http://localhost:4000/api/url", {
				method: "POST",
				body: JSON.stringify({
					url,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const data = await request.json();
			if (data.message) {
				setLoading(false);
				setWebsiteContent(data.result);
			}
		} catch (err) {
			console.error(err);
		}
	}
	if (loading) {
		return <Loading />;
	}
	return (
		<div className='home'>
			<form className='home__form'>
				<h2>Website Aggregator</h2>
				<label htmlFor='url'>Provide the website URL</label>
				<input
					type='url'
					name='url'
					id='url'
					value={url}
					onChange={(e) => setURL(e.target.value)}
				/>
				<button onClick={handleSubmit}>ADD WEBSITE</button>
			</form>
			{!loading && websiteContent.brandName && (
				<main className='website__container'>
					<div className='website__item'>
						<img
							src={websiteContent?.brandImage}
							alt={websiteContent?.brandName}
						/>
						<h3>{websiteContent?.brandName}</h3>
						<p>{websiteContent?.brandDescription}</p>
					</div>
				</main>
			)}
		</div>
	);
};

export default App;

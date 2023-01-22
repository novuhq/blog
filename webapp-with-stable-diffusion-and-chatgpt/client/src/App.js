import React, { useState } from "react";
import Loading from "./Loading";

const App = () => {
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		sendDescription();
		setDescription("");
		setLoading(true);
	};

	async function sendDescription() {
		try {
			const request = await fetch("http://localhost:4000/api", {
				method: "POST",
				body: JSON.stringify({
					prompt: description,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			const res = await request.json();
			if (res.message) {
				setLoading(false);
				setResult(res.result);
			}
		} catch (err) {
			console.error(err);
		}
	}

	if (loading) return <Loading />;

	return (
		<div className='app'>
			<h1>Website Idea Generator</h1>
			<form method='POST' onSubmit={handleSubmit}>
				<label htmlFor='description'>Enter the description</label>
				<textarea
					name='description'
					rows={6}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button>GENERATE</button>
			</form>
			<div className='result__container'>
				{result.length > 0 &&
					result.map((item, index) => (
						<div key={index}>
							<img
								src={`data:image/png;base64,${item.logoImage}`}
								alt={item.domainName}
								className='image'
							/>
							<p>Domain: {item.domainName}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default App;

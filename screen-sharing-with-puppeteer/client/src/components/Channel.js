import React, { useState, useEffect, useRef } from "react";

const Channel = ({ socket }) => {
	const [URL, setURL] = useState("");
	const [imageString, setImageString] = useState("");
	const [error, setError] = useState("");

	const cursorRef = useRef();

	const takeScreenshot = (e) => {
		e.preventDefault();
		socket.emit("screenshotPage", URL);
		setURL("");
	};

	useEffect(() => {
		socket.on("imageBuffer", (data) => {
			setImageString(btoa(String.fromCharCode(...new Uint8Array(data))));
		});

		socket.on("setMousePosition", (data) => console.log("Positions >>", data));

		socket.on("errorBuffer", (err) => setError(err));
	}, [socket]);

	useEffect(() => {
		function handleMouseMove(e) {
			socket.emit("mousePosition", {
				x: e.pageX,
				y: e.pageY,
			});
		}
		document.addEventListener("mousemove", handleMouseMove);
		return () => document.removeEventListener("mousemove", handleMouseMove);
	}, [socket]);

	return (
		<div className='channel'>
			<nav className='channel__navbar'>
				<h3>Share Screens</h3>
				<button>LEAVE CHANNEL</button>
			</nav>
			<main>
				<form className='form' onSubmit={takeScreenshot}>
					<label>Provide a URL for screenshot</label>
					<input
						type='url'
						name='url'
						id='url'
						className='form__input'
						required
						value={URL}
						onChange={(e) => setURL(e.target.value)}
					/>
					<button className='form__button'>SCREENSHOT</button>
				</form>
				{!imageString ? (
					<div className='screen__share' ref={cursorRef}>
						<img src={`data:image/png;base64,${imageString}`} alt='' />
					</div>
				) : (
					<p>Take a screenshot...</p>
				)}
				{error && <p>{error}</p>}
			</main>
		</div>
	);
};

export default Channel;

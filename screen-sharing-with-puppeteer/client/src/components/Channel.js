import React, { useState, useEffect, useRef } from "react";

const Channel = ({ socket }) => {
	const [URL, setURL] = useState("");
	const [imageString, setImageString] = useState("");
	const cursorRef = useRef();
	const takeScreenshot = (e) => {
		e.preventDefault();
		socket.emit("screenshotPage", { url: URL });
		setURL("");
	};
	useEffect(() => {
		socket.on("imageBuffer", (data) => {
			setImageString(btoa(String.fromCharCode(...new Uint8Array(data))));
		});

		//Receives mouse position from the server
		socket.on("setMousePosition", (data) => {
			// const position = cursorRef.current.getBoundingClientRect();
			// console.log("POSTION >>>", position);
			console.log("Positions >>", data);
		});
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

	// const emitClickOnScreen = (eventName) => (event) => {
	// 	const position = cursorRef.current.getBoundingClientRect();
	// 	const widthChange = 1255 / position.width;
	// 	const heightChange = 800 / position.height;
	// 	console.log({
	// 		x: widthChange * (event.pageX - position.left),
	// 		y:
	// 			heightChange *
	// 			(event.pageY - position.top - document.documentElement.scrollTop),
	// 	});
	// };
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
				<div className='screen__share' ref={cursorRef}>
					{imageString && (
						<img
							src={`data:image/png;base64,${imageString}`}
							alt=''
							// onMouseMove={emitClickOnScreen("move")}
							// onClick={emitClickOnScreen("click")}
						/>
					)}
				</div>
			</main>
		</div>
	);
};

export default Channel;

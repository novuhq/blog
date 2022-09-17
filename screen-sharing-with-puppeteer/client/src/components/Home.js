import React, {useCallback, useState} from "react";
import Modal from "./Modal";

const Home = () => {
	console.log('aaaa');
	const [url, setURL] = useState('');
	const [show, setShow] = useState(false);
	const handleCreateChannel = useCallback(() => {
		setShow(true);
	}, []);
	return (
		<div>
			<div className='home__container'>
				<h2>URL</h2>
				<form className='form'>
					<label>Provide a URL</label>
					<input
						type='url'
						name='url'
						id='url'
						className='form__input'
						required
						value={url}
						onChange={(e) => setURL(e.target.value)}
					/>
				</form>
				{show && <Modal show={show} url={url} />}
				<button className='createChannelBtn' onClick={handleCreateChannel}>
					BROWSE
				</button>
			</div>
		</div>
	);
};

export default Home;

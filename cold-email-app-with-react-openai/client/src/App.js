import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";
import SendResume from "./components/SendResume";

const App = () => {
	const [result, setResult] = useState({});

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home setResult={setResult} />} />
					<Route path='/resume' element={<Resume result={result} />} />
					<Route path='/send/resume' element={<SendResume />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

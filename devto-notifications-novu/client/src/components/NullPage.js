import React from "react";
import { Link } from "react-router-dom";

const NullPage = () => {
	return (
		<div style={{ padding: "20px" }}>
			<h3>
				Go back to the <Link to='/'>sign in page</Link>
			</h3>
		</div>
	);
};

export default NullPage;

import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
	return (
		<nav className='navbar'>
			<h3>PhotoShare</h3>

			<div className='nav__BtnGroup'>
				<Link to='/user/photos' style={{ marginRight: "10px" }}>
					My Photos
				</Link>
				<Link to='/photo/upload'>Upload Photo</Link>
			</div>
		</nav>
	);
};

export default Nav;

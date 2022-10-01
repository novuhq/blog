import React from "react";
// import {
// 	NovuProvider,
// 	PopoverNotificationCenter,
// 	NotificationBell,
// } from "@novu/notification-center";
// import { useNavigate } from "react-router-dom";

const Nav = () => {
	// const navigate = useNavigate();

	// const onNotificationClick = (notification) =>
	// 	navigate(notification.cta.data.url);
	return (
		<nav className='navbar'>
			<h2>Todo List</h2>
			{/* <div>
				<NovuProvider
					subscriberId='62d1fc97bbe3160014a8cb23'
					applicationIdentifier='Xr_knh-UYIPD'
				>
					<PopoverNotificationCenter
						onNotificationClick={onNotificationClick}
						colorScheme='light'
					>
						{({ unseenCount }) => (
							<NotificationBell unseenCount={unseenCount} />
						)}
					</PopoverNotificationCenter>
				</NovuProvider>
			</div> */}
		</nav>
	);
};

export default Nav;

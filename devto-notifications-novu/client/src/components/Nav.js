import React from "react";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const navigate = useNavigate();

	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);

	const handleLogOut = () => {
		localStorage.removeItem("_username");
		navigate("/");
	};

	return (
		<nav className='navbar'>
			<div>
				<img
					src='https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png'
					alt='Dev.to'
					className='logo'
				/>
			</div>
			<div className='notification__container'>
				<div>
					<NovuProvider
						subscriberId='<SUBSCRIBER_ID>'
						applicationIdentifier='<APP_ID>'
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
				</div>
				<button className='logOutBtn' onClick={handleLogOut}>
					LOG OUT
				</button>
			</div>
		</nav>
	);
};

export default Nav;

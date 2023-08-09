import React from "react";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

function Novu() {
	const navigate = useNavigate();
	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);

	return (
		<>
			<NovuProvider
				subscriberId=<YOUR_SUBERSCRIBER_ID>
				applicationIdentifier=<YOUR_APP_ID>
				// initialFetchingStrategy={{
				// 	fetchNotifications: true,
				// 	fetchUserPreferences: true,
				// }}
			>
				<PopoverNotificationCenter
					onNotificationClick={onNotificationClick}
					colorScheme='light'
				>
					{({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
				</PopoverNotificationCenter>
			</NovuProvider>
		</>
	);
}

export default Novu;

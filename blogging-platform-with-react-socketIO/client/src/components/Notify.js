import React from "react";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Notify = () => {
	const navigate = useNavigate();

	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);

	return (
		<div>
			<NovuProvider
				subscriberId='<YOUR_SUBSCRIBER_ID>'
				applicationIdentifier='<APP_ID>'
			>
				<PopoverNotificationCenter
					onNotificationClick={onNotificationClick}
					colorScheme='light'
				>
					{({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
				</PopoverNotificationCenter>
			</NovuProvider>
		</div>
	);
};

export default Notify;

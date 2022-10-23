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
				subscriberId='62d1fc97bbe3160014a8cb23'
				applicationIdentifier='Xr_knh-UYIPD'
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

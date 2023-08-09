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
				subscriberId='<YOUR_NOVU_SUBSCRIBER_ID>'
				applicationIdentifier='<YOUR_NOVU_APP_ID>'
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

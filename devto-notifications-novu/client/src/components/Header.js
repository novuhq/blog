import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate();

	function onNotificationClick(notification) {
		navigate(notification.cta.data.url);
	}

	return (
		<NovuProvider
			subscriberId='62d1fc97bbe3160014a8cb23'
			applicationIdentifier='Xr_knh-UYIPD'
		>
			<PopoverNotificationCenter onNotificationClick={onNotificationClick}>
				{({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
			</PopoverNotificationCenter>
		</NovuProvider>
	);
}
export default Header;

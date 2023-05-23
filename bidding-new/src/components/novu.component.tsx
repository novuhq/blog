"use client";

import {
    NotificationBell,
    NovuProvider,
    PopoverNotificationCenter,
} from "@novu/notification-center";
import { FC } from "react";

export const NovuComponent: FC<{ user: string }> = (props) => {
    const { user } = props;
    return (
        <>
            <NovuProvider subscriberId={user} applicationIdentifier="APP_KEY">
                <PopoverNotificationCenter onNotificationClick={() => window.location.reload()}>
                    {({ unseenCount }) => <NotificationBell unseenCount={unseenCount!} />}
                </PopoverNotificationCenter>
            </NovuProvider>
        </>
    );
};

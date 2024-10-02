'use client'
import React, { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    IconButton,
    VStack,
    Avatar,
    HStack,
    Link,
    Icon,
    useColorModeValue,
    Button,
    Heading,
} from "@chakra-ui/react";
import { FiArchive, FiSearch, FiHome, FiInbox, FiSettings, FiChevronDown } from "react-icons/fi";
import { FaRegCheckSquare, FaUserFriends } from "react-icons/fa";
import { PiNotificationFill } from "react-icons/pi";
import { BsFillFileTextFill, BsTrash } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { Inbox, Notification, Notifications } from "@novu/react";
import { NotionIcon } from "../icons/Notion";

const subscriberId = process.env.NEXT_PUBLIC_SUBSCRIBERID;
const applicationIdentifier = process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID;

const AppContainer = () => {
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const [isInboxOpen, setIsInboxOpen] = useState(true);

    const toggleInbox = () => {
        setIsInboxOpen(!isInboxOpen);
    };

    return (
        <Flex
            width="100vw"
            height="100vh"
            bg="gray.100"
            overflow="hidden"
            justifyContent="center"
            alignItems="center"
            style={{
                fontFamily:
                    'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
            }}
        >
            <Box
                width="80%"
                height="80%"
                bg="white"
                borderRadius="lg"
                boxShadow="xl"
                overflow="hidden"
            >
                <Flex height="100%">
                    {/* Sidebar */}
                    <Box
                        width="240px"
                        bg="rgb(247, 247, 245)"
                        padding="8px"
                        display="flex"
                        flexDirection="column"
                        borderColor={borderColor}
                        borderRightWidth="1px"
                    >
                        <Flex alignItems="center" mb="4px" padding="0.6rem">
                            <Text
                                fontSize="1.25rem"
                                fontWeight="bold"
                                color="rgb(55, 53, 47)"
                            >
                                <Icon
                                    as={NotionIcon}
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        marginRight: "8px",
                                        display: "inline-block",
                                    }}
                                />{" "}
                                Workspace
                            </Text>
                            <IconButton
                                aria-label="User Settings"
                                icon={<FiChevronDown />}
                                variant="ghost"
                                size="sm"
                            />
                        </Flex>

                        <VStack align="stretch" spacing={1} mb="15px">
                            <SidebarItem icon={FiSearch} label="Search" />
                            <SidebarItem icon={FiHome} label="Home" />
                            <SidebarItem icon={FiInbox} label="Inbox" isActive={isInboxOpen} onClick={toggleInbox} />
                            <SidebarItem icon={FiSettings} label="Settings & members" />
                        </VStack>

                        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
                            Favorites
                        </Text>
                        <VStack align="stretch" spacing={1} mb="15px">
                            <SidebarItem icon={FiHome} label="Teamspaces" />
                            <SidebarItem icon={BsFillFileTextFill} label="Shared" />
                        </VStack>

                        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
                            Private
                        </Text>
                        <VStack align="stretch" spacing={1} mb="15px">
                            <SidebarItem icon={AiOutlineCalendar} label="Calendar" />
                            <SidebarItem icon={FaUserFriends} label="Templates" />
                            <SidebarItem icon={BsTrash} label="Trash" />
                        </VStack>
                    </Box>

                    {/* Main Content Area */}
                    <Box
                        flex="1"
                        bg="white"
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        p={0}
                        position="relative"
                    >
                        {/* Injected Content Behind the Inbox */}
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            bg="white"
                            zIndex={0} // Content will be behind the inbox
                            padding="20px"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            textAlign="center"
                            overflowY="auto" // Allow scrolling if content exceeds viewport
                        >
                            <Heading color="gray.600">
                                Notion Inbox Notification Theme
                            </Heading>
                            <Text fontSize="lg" color="gray.500" mt="4">
                                Checkout the deployed version now
                            </Text>
                            <Button
                                mt="8"
                                colorScheme="blue"
                                onClick={() => window.open('https://inbox.novu.co/', '_blank')}
                            >
                                Visit Playground
                            </Button>
                        </Box>


                        {/* Inbox Popover */}
                        {isInboxOpen && (
                            <Box
                                height="100%"
                                bg="white"
                                overflowY="auto"
                                width="100%"
                                maxW="390px"
                                zIndex={1}
                                boxShadow={
                                    "rgba(15, 15, 15, 0.04) 0px 0px 0px 1px, rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px"
                                }
                            >
                                <Inbox
                                    subscriberId={subscriberId as string}
                                    applicationIdentifier={applicationIdentifier as string}
                                >
                                    <Notifications
                                        renderNotification={(notification) => (
                                            <InboxItem notification={notification} />
                                        )}
                                    />
                                </Inbox>

                            </Box>
                        )}
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

// Sidebar Item Component
interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
    external?: boolean;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    label,
    isActive = false,
    external = false,
    onClick,
}) => {
    return (
        <HStack
            as={external ? Link : Box}
            spacing={3}
            p={2}
            fontWeight="500"
            borderRadius="6px"
            bg={isActive ? "rgba(0, 0, 0, 0.03)" : "transparent"}
            color={isActive ? "rgb(29, 27, 22)" : "rgba(55, 53, 47, 0.65)"}
            _hover={{ bg: "rgba(0, 0, 0, 0.03)", cursor: "pointer" }}
            sx={{
                height: "28px",
                padding: "4px 8px",
            }}
            onClick={onClick}
        >
            <Icon
                sx={{
                    width: "20px",
                    height: "20px",
                }}
                as={icon}
            />
            <Text fontSize="14px">{label}</Text>
        </HStack>
    );
};

const InboxItem = ({ notification }: { notification: Notification }) => {
    const [isHovered, setIsHovered] = useState(false);
    const notificationType = notification.tags?.[0];

    return (
        <Box
            p={2}
            bg="white"
            position="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Flex align="flex-start" position="relative">
                <VStack spacing={0} position="absolute" top="0" right="0">
                    {isHovered && (
                        <Box bg="white" display="flex" gap={1}>
                            {notification.isRead ? (
                                <IconButton
                                    aria-label="Mark as unread"
                                    icon={<PiNotificationFill />}
                                    onClick={() => notification.unread()}
                                    size="sm"
                                    variant="ghost"
                                />
                            ) : (
                                <IconButton
                                    aria-label="Mark as read"
                                    icon={<FaRegCheckSquare />}
                                    onClick={() => notification.read()}
                                    size="sm"
                                    variant="ghost"
                                />
                            )}
                            {notification.isArchived ? (
                                <IconButton
                                    aria-label="Unarchive"
                                    icon={<PiNotificationFill />}
                                    onClick={() => notification.unarchive()}
                                    size="sm"
                                    variant="ghost"
                                />
                            ) : (
                                <IconButton
                                    aria-label="Archive"
                                    icon={<FiArchive />}
                                    onClick={() => notification.archive()}
                                    size="sm"
                                    variant="ghost"
                                />
                            )}
                        </Box>
                    )}
                </VStack>

                <Box
                    position="relative"
                    display="flex"
                    alignItems="center"
                    mr="8px"
                    height="26px"
                >
                    {!notification.isRead && (
                        <Box>
                            <Box width="8px" height="8px" bg="blue.500" borderRadius="full" />
                        </Box>
                    )}
                    {notification.avatar !== undefined && (
                        <Avatar
                            width="24px"
                            height="24px"
                            marginLeft="8px"
                            name={notification.to.firstName}
                            src={notification.avatar || undefined}
                        />
                    )}
                </Box>

                <VStack align="start" spacing="8px" flex="1" mt="3px">
                    <Flex justify="space-between" width="100%">
                        <Text fontSize="14px" color="gray.800" fontWeight="600">
                            {notification.subject}
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                            {formatTime(notification.createdAt)}
                        </Text>
                    </Flex>

                    {notificationType !== "Mention" &&
                        notificationType !== "Comment" &&
                        notificationType !== "Invite" && (
                            <Text fontSize="14px" color="gray.800">
                                {notification.body}
                            </Text>
                        )}

                    {(notificationType === "Mention" ||
                        notificationType === "Comment") && (
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<GrDocumentText />}
                                _hover={{ bg: "rgba(0, 0, 0, 0.03)" }}
                                pl="2px"
                                pr="5px"
                                height="25px"
                            >
                                <Text
                                    fontSize="14px"
                                    color="gray.800"
                                    fontWeight="500"
                                    backgroundImage="linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%)"
                                    backgroundRepeat="repeat-x"
                                    backgroundSize="100% 1px"
                                    backgroundPosition="0 100%"
                                    mr="-2px"
                                >
                                    {notification.body}
                                </Text>
                            </Button>
                        )}

                    {notificationType === "Invite" && (
                        <Button
                            variant="outline"
                            size="md"
                            _hover={{ bg: "rgba(0, 0, 0, 0.03)" }}
                            padding="12px"
                            height="50px"
                            fontSize="14px"
                            width="100%"
                            borderRadius="8px"
                            textAlign="left"
                            border="1px solid rgba(227, 226, 224, 0.5)"
                            justifyContent="space-between"
                        >
                            {notification.body}
                        </Button>
                    )}

                    {notificationType === "Comment" && (
                        <Box>
                            <Text fontSize="12px" color="rgb(120, 119, 116)" fontWeight="400">
                                John Doe
                            </Text>
                            <Text fontSize="14px" color="rgb(55, 53, 47)" fontWeight="400">
                                This is a notification Comment made by John Doe and posted on
                                the page Top Secret Project
                            </Text>
                        </Box>
                    )}

                    <HStack spacing={3}>
                        {notification.primaryAction && (
                            <Button
                                variant="outline"
                                size="xs"
                                colorScheme="gray"
                                borderRadius="md"
                                borderColor="gray.300"
                                _hover={{ bg: "gray.100" }}
                                paddingRight="8px"
                                paddingLeft="8px"
                                lineHeight="26px"
                                height="26px"
                            >
                                {notification.primaryAction.label}
                            </Button>
                        )}
                        {notification.secondaryAction && (
                            <Button
                                variant="ghost"
                                size="xs"
                                colorScheme="gray"
                                borderRadius="md"
                                borderColor="gray.300"
                                _hover={{ bg: "gray.100" }}
                                paddingRight="8px"
                                paddingLeft="8px"
                                lineHeight="26px"
                                height="26px"
                            >
                                {notification.secondaryAction.label}
                            </Button>
                        )}
                    </HStack>
                </VStack>
            </Flex>
        </Box>
    );
};

function formatTime(timestamp: number | string | Date): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInWeek = secondsInDay * 7;
    const secondsInYear = secondsInDay * 365;

    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds} seconds`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (diffInSeconds < secondsInYear) {
        const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
    } else {
        return date.getFullYear().toString();
    }
}

export default AppContainer;
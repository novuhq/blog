import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	Button,
	FlatList,
	Pressable,
} from "react-native";
import socket from "../socket";
import MessageComponent from "../component/MessageComponent";

const Messaging = ({ route, navigation }) => {
	const { name, id, user } = route.params;

	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState("");
	const handleNewMessage = () => {
		const hour =
			new Date().getHours() < 10
				? `0${new Date().getHours()}`
				: `${new Date().getHours()}`;

		const mins =
			new Date().getMinutes() < 10
				? `0${new Date().getMinutes()}`
				: `${new Date().getMinutes()}`;

		socket.emit("newMessage", {
			message,
			room_id: id,
			user,
			timestamp: { hour, mins },
		});
	};
	useLayoutEffect(() => {
		navigation.setOptions({ title: name });
		socket.emit("findRoom", id);
		socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
	}, []);

	useEffect(() => {
		socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
	}, [socket]);
	return (
		<View style={styles.screen}>
			<View
				style={[styles.screen, { paddingVertical: 15, paddingHorizontal: 10 }]}
			>
				{chatMessages[0] ? (
					<FlatList
						data={chatMessages}
						renderItem={({ item }) => (
							<MessageComponent item={item} user={user} />
						)}
						keyExtractor={(item) => item.id}
					/>
				) : (
					""
				)}
			</View>

			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={(value) => setMessage(value)}
				/>
				<Pressable style={styles.buttonContainer} onPress={handleNewMessage}>
					<View>
						<Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default Messaging;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	messageWrapper: { width: "100%", alignItems: "flex-end", marginBottom: 15 },
	message: {
		maxWidth: "50%",
		backgroundColor: "rgb(194, 243, 194)",
		padding: 15,
		borderRadius: 10,
		marginBottom: 2,
	},
	avatar: {
		marginRight: 5,
	},
	inputContainer: {
		width: "100%",
		minHeight: 100,
		backgroundColor: "white",
		paddingVertical: 30,
		paddingHorizontal: 15,
		justifyContent: "center",
		flexDirection: "row",
	},
	input: {
		borderWidth: 1,
		padding: 15,
		flex: 1,
		marginRight: 10,
		borderRadius: 20,
	},
	buttonContainer: {
		width: "30%",
		backgroundColor: "green",
		borderRadius: 3,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},
});

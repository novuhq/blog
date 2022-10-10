import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatComponent = ({ item, username }) => {
	const navigation = useNavigation();
	const [messages, setMessages] = useState({});

	useLayoutEffect(() => {
		setMessages(item.messages[item.messages.length - 1]);
	}, []);

	return (
		<Pressable
			style={styles.chat}
			onPress={() => {
				navigation.navigate("Messaging", {
					id: item.id,
					name: item.name,
					user: username,
				});
			}}
		>
			<Ionicons
				name='person-circle-outline'
				size={45}
				color='black'
				style={styles.avatar}
			/>

			<View style={styles.rightContainer}>
				<View>
					<Text style={styles.username}>{item.name}</Text>

					<Text style={styles.message}>
						{messages?.text ? messages.text : "Tap to start chatting"}
					</Text>
				</View>
				<View>
					<Text style={styles.time}>
						{messages?.text ? messages.time : "now"}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default ChatComponent;

const styles = StyleSheet.create({
	chat: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 5,
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		height: 80,
		marginBottom: 10,
	},
	avatar: {
		marginRight: 15,
	},
	username: {
		fontSize: 18,
		marginBottom: 5,
		fontWeight: "bold",
	},
	message: {
		fontSize: 14,
		opacity: 0.7,
	},
	rightContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flex: 1,
	},
	time: {
		opacity: 0.5,
	},
});

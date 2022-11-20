import React, { useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import MessageComponent from "../component/MessageComponent";
import { styles } from "../utils/styles";

const Messaging = ({ route, navigation }) => {
	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState("");

	const { name, id, user } = route.params;

	//👇🏻 Sets the header title to the name chatroom's name
	useLayoutEffect(() => {
		navigation.setOptions({ title: name });
	}, []);

	const handleNewMessage = () => {
		const hour =
			new Date().getHours() < 10
				? `0${new Date().getHours()}`
				: `${new Date().getHours()}`;

		const mins =
			new Date().getMinutes() < 10
				? `0${new Date().getMinutes()}`
				: `${new Date().getMinutes()}`;

		console.log({
			message,
			user,
			timestamp: { hour, mins },
		});
	};

	return (
		<View style={styles.messagingscreen}>
			<View
				style={[
					styles.messagingscreen,
					{ paddingVertical: 15, paddingHorizontal: 10 },
				]}
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

			<View style={styles.messaginginputContainer}>
				<TextInput
					style={styles.messaginginput}
					onChangeText={(value) => setMessage(value)}
				/>
				<Pressable
					style={styles.messagingbuttonContainer}
					onPress={handleNewMessage}
				>
					<View>
						<Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default Messaging;

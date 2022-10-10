import React, { useState, useLayoutEffect, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	SafeAreaView,
	FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "../component/Modal";
import ChatComponent from "../component/ChatComponent";
import socket from "../socket";

const Chat = ({ route }) => {
	const [visible, setVisible] = useState(false);
	const [rooms, setRooms] = useState([]);
	const { username } = route.params;

	useLayoutEffect(() => {
		function fetchGroups() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => setRooms(data))
				.catch((err) => console.error(err));
		}
		fetchGroups();
	}, []);

	useEffect(() => {
		socket.on("roomsList", (rooms) => {
			setRooms(rooms);
		});
	}, [socket]);

	const handleCreateGroup = () => setVisible(true);

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.topContainer}>
				<View style={styles.header}>
					<Text style={styles.heading}>Chats</Text>
					<Pressable onPress={handleCreateGroup}>
						<Feather name='edit' size={24} color='green' />
					</Pressable>
				</View>
			</View>

			<View style={styles.listContainer}>
				{rooms.length > 0 ? (
					<FlatList
						data={rooms}
						renderItem={({ item }) => (
							<ChatComponent item={item} username={username} />
						)}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<View
						style={{
							width: "100%",
							height: "80%",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text
							style={{ fontWeight: "bold", fontSize: 24, paddingBottom: 30 }}
						>
							No rooms created!
						</Text>
						<Text>Click the icon above to create a Chat room</Text>
					</View>
				)}
			</View>
			{visible ? <Modal setVisible={setVisible} /> : ""}
		</SafeAreaView>
	);
};

export default Chat;

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "#F7F7F7",
		flex: 1,
		padding: 10,
		position: "relative",
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		color: "green",
	},
	topContainer: {
		backgroundColor: "#F7F7F7",
		height: 70,
		width: "100%",
		padding: 20,
		justifyContent: "center",
		marginBottom: 15,
		elevation: 2,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	listContainer: {
		paddingHorizontal: 10,
	},
});

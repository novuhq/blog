import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import socket from "../socket";

const Modal = ({ setVisible }) => {
	const closeModal = () => setVisible(false);
	const [groupName, setGroupName] = useState("");

	const handleCreateRoom = () => {
		socket.emit("createRoom", groupName);
		closeModal();
	};
	return (
		<View style={styles.modalContainer}>
			<Text style={styles.subheading}>Enter your Group name</Text>
			<TextInput
				style={styles.input}
				placeholder='Group name'
				onChangeText={(value) => setGroupName(value)}
			/>
			<View style={styles.buttonContainer}>
				<Pressable style={styles.button} onPress={handleCreateRoom}>
					<Text style={styles.text}>CREATE</Text>
				</Pressable>
				<Pressable
					style={[styles.button, { backgroundColor: "#E14D2A" }]}
					onPress={closeModal}
				>
					<Text style={styles.text}>CANCEL</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Modal;

const styles = StyleSheet.create({
	button: {
		width: "40%",
		height: 45,
		backgroundColor: "green",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		color: "#fff",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	text: {
		color: "#fff",
	},
	modalContainer: {
		width: "100%",
		borderTopColor: "#ddd",
		borderTopWidth: 1,
		elevation: 1,
		height: 400,
		backgroundColor: "#fff",
		position: "absolute",
		bottom: 0,
		zIndex: 10,
		paddingVertical: 50,
		paddingHorizontal: 20,
	},
	input: {
		borderWidth: 2,
		padding: 15,
	},
	subheading: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
});

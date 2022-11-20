import {
	Modal,
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import socket from "../utils/socket";

const ShowModal = ({ setVisible, visible }) => {
	const [input, setInput] = useState("");

	const handleSubmit = () => {
		if (input !== "") {
			socket.emit("addTodo", input);
			setVisible(!visible);
		}
	};

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={visible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
				setVisible(!visible);
			}}
		>
			<SafeAreaView style={styles.modalScreen}>
				<TextInput
					style={styles.textInput}
					value={input}
					onChangeText={(value) => setInput(value)}
				/>

				<Pressable onPress={handleSubmit} style={styles.modalButton}>
					<View>
						<Text style={styles.buttonText}>Add Todo</Text>
					</View>
				</Pressable>
			</SafeAreaView>
		</Modal>
	);
};

export default ShowModal;

const styles = StyleSheet.create({
	modalScreen: {
		backgroundColor: "#fff",
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	textInput: {
		borderWidth: 1,
		padding: 10,
		width: "95%",
		marginBottom: 15,
	},
	modalButton: {
		backgroundColor: "#0D4C92",
		padding: 10,
	},
	buttonText: {
		fontSize: 18,
		textAlign: "center",
		color: "#fff",
	},
});

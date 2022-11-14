import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Pressable,
	Alert,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import socket from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Modal = ({ setVisible, selectedProduct }) => {
	const [newPrice, setNewPrice] = useState(selectedProduct.price);
	const [user, setUser] = useState("");

	const getUsername = async () => {
		try {
			const value = await AsyncStorage.getItem("username");
			if (value !== null) {
				setUser(value);
			}
		} catch (e) {
			console.error("Error while loading username!");
		}
	};

	useLayoutEffect(() => {
		getUsername();
	}, []);

	const updateBidFunction = () => {
		if (Number(newPrice) > Number(selectedProduct.price)) {
			socket.emit("updatePrice", { newPrice, user, selectedProduct });
			setVisible(false);
		} else {
			Alert.alert("Error!", "New price must be more than the bidding price");
		}
	};
	return (
		<View style={styles.modalContainer}>
			<Text style={styles.modalHeader}>Update Bid</Text>
			<Text style={{ marginBottom: 10 }}>Name: {selectedProduct.name}</Text>
			<Text style={{ marginBottom: 10 }}>Price</Text>
			<TextInput
				keyboardType='number-pad'
				style={styles.modalPrice}
				defaultValue={selectedProduct.price}
				onChangeText={(value) => setNewPrice(value)}
			/>
			<View style={{ width: "100%", alignItems: "center" }}>
				<Pressable style={styles.updateBidBtn} onPress={updateBidFunction}>
					<View>
						<Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
							PLACE BID
						</Text>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default Modal;

const styles = StyleSheet.create({
	modalContainer: {
		width: "100%",
		backgroundColor: "#FAF7F0",
		position: "fixed",
		bottom: 0,
		height: 400,
		padding: 20,
		flex: 1,
	},
	modalHeader: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	modalPrice: {
		width: "100%",
		borderWidth: 1,
		padding: 12,
	},
	updateBidBtn: {
		width: 200,
		padding: 15,
		backgroundColor: "green",
		marginTop: 15,
		borderRadius: 3,
	},
});

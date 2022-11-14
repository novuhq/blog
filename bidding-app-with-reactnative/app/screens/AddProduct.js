import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Pressable,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import socket from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddProduct = ({ navigation }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [url, setURL] = useState("");
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

	const addProduct = () => {
		if (name.trim() && price.trim() && url.trim()) {
			socket.emit("addProduct", { name, price, url, user });
			navigation.navigate("BidPage");
		}
	};
	return (
		<SafeAreaView style={styles.addProductContainer}>
			<View style={styles.productForm}>
				<Text>Product Name</Text>
				<TextInput
					style={styles.formInput}
					onChangeText={(value) => setName(value)}
				/>

				<Text>Product Price</Text>
				<TextInput
					style={styles.formInput}
					onChangeText={(value) => setPrice(value)}
				/>

				<Text>Product Image URL</Text>
				<TextInput
					style={styles.formInput}
					keyboardType='url'
					onChangeText={(value) => setURL(value)}
					autoCapitalize='none'
					autoCorrect={false}
				/>

				<Pressable style={styles.addProductBtn} onPress={addProduct}>
					<View>
						<Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
							ADD PRODUCT
						</Text>
					</View>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default AddProduct;

const styles = StyleSheet.create({
	addProductContainer: {
		flex: 1,
	},
	productForm: {
		width: "100%",
		padding: 10,
	},
	formInput: {
		borderWidth: 1,
		padding: 15,
		marginTop: 5,
		marginBottom: 10,
	},
	addProductBtn: {
		backgroundColor: "green",
		padding: 15,
	},
});

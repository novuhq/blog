import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	TextInput,
	Pressable,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
	const [username, setUsername] = useState("");

	const storeUsername = async () => {
		try {
			await AsyncStorage.setItem("username", username);
			navigation.navigate("BidPage");
		} catch (e) {
			Alert.alert("Error! While saving username");
		}
	};
	const handleLogin = () => {
		if (username.trim()) {
			storeUsername();
		} else {
			Alert.alert("Username is required.");
		}
	};
	return (
		<SafeAreaView style={styles.loginContainer}>
			<Text style={styles.heading}>Login</Text>
			<View style={styles.formContainer}>
				<Text style={styles.formLabel}>Username</Text>
				<TextInput
					placeholder='Enter your name'
					style={styles.input}
					autoCorrect={false}
					onChangeText={(value) => setUsername(value)}
				/>

				<Pressable style={styles.loginbutton} onPress={handleLogin}>
					<View>
						<Text style={styles.loginbuttonText}>Get Started</Text>
					</View>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	heading: {
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 20,
	},
	formContainer: {
		width: "100%",
		padding: 15,
	},
	input: {
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 15,
		marginBottom: 15,
		borderRadius: 3,
	},
	formLabel: {
		marginBottom: 3,
	},
	loginbutton: {
		backgroundColor: "green",
		width: 150,
		padding: 15,
		alignItems: "center",
		borderRadius: 5,
	},
	loginbuttonText: {
		color: "#fff",
	},
});

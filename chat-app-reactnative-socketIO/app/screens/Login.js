import React, { useState } from "react";
import {
	Text,
	SafeAreaView,
	StyleSheet,
	View,
	TextInput,
	Pressable,
	Alert,
} from "react-native";

const Login = ({ navigation }) => {
	const [username, setUsername] = useState("");

	const handleSignIn = () => {
		if (username.trim()) {
			navigation.navigate("Chat", { username });
		} else {
			Alert.alert("Username is required.");
		}
	};
	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.screen}>
				<Text style={styles.heading}>Sign in</Text>
				<View style={styles.inputContainer}>
					<TextInput
						autoCorrect={false}
						placeholder='Enter your username'
						style={styles.input}
						onChangeText={(value) => {
							setUsername(value);
						}}
					/>
				</View>

				<Pressable onPress={handleSignIn} style={styles.button}>
					<View>
						<Text style={styles.buttonText}>Get Started</Text>
					</View>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#EEF1FF",
		alignItems: "center",
		justifyContent: "center",
		padding: 12,
		width: "100%",
	},
	heading: {
		fontSize: 26,
		marginBottom: 10,
	},
	inputContainer: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		borderWidth: 1,
		width: "90%",
		padding: 8,
		borderRadius: 2,
	},
	button: {
		backgroundColor: "green",
		padding: 12,
		marginVertical: 10,
		width: "60%",
		borderRadius: "50%",
		elevation: 1,
	},
	buttonText: {
		textAlign: "center",
		color: "#fff",
		fontWeight: "600",
	},
});

import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CommentUI = ({ item }) => {
	return (
		<View style={styles.comment}>
			<View style={styles.message}>
				<Text style={{ fontSize: 16 }}>{item.title}</Text>
			</View>

			<View>
				<Text>{item.user}</Text>
			</View>
		</View>
	);
};

export default CommentUI;

const styles = StyleSheet.create({
	comment: { marginBottom: 20 },
	message: {
		padding: 15,
		backgroundColor: "#CDF0EA",
		width: "80%",
		borderRadius: 10,
	},
});

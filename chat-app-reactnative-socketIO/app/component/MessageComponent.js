import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function MessageComponent({ item, user }) {
	return (
		<View>
			{item.user !== user ? (
				<View style={styles.messageWrapper}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Ionicons
							name='person-circle-outline'
							size={30}
							color='black'
							style={styles.avatar}
						/>
						<View style={styles.message}>
							<Text>{item.text}</Text>
						</View>
					</View>
					<Text style={{ marginLeft: 40 }}>{item.time}</Text>
				</View>
			) : (
				<View style={[styles.messageWrapper, { alignItems: "flex-end" }]}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<View
							style={[
								styles.message,
								{ backgroundColor: "rgb(194, 243, 194)" },
							]}
						>
							<Text>{item.text}</Text>
						</View>
						<Ionicons
							name='person-circle-outline'
							size={30}
							color='black'
							style={styles.avatar}
						/>
					</View>
					<Text style={{ marginRight: 40 }}>{item.time}</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	messageWrapper: { width: "100%", alignItems: "flex-start", marginBottom: 15 },
	message: {
		maxWidth: "50%",
		backgroundColor: "#f5ccc2",
		padding: 15,
		borderRadius: 10,
		marginBottom: 2,
	},
	avatar: {
		marginRight: 5,
	},
});

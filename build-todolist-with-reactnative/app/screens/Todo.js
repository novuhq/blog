import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import socket from "../utils/socket";

const Todo = ({ item }) => {
	const navigation = useNavigation();

	const deleteTodo = (id) => socket.emit("deleteTodo", id);

	return (
		<View style={styles.todoContainer}>
			<View>
				<Text style={styles.todoTitle}>{item.title}</Text>
				<Text
					style={styles.subTitle}
					onPress={() =>
						navigation.navigate("Comments", {
							title: item.title,
							id: item._id,
						})
					}
				>
					View comments
				</Text>
			</View>
			<View>
				<AntDesign
					name='delete'
					size={24}
					color='red'
					onPress={() => deleteTodo(item._id)}
				/>
			</View>
		</View>
	);
};

export default Todo;

const styles = StyleSheet.create({
	todoContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#CDF0EA",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	todoTitle: {
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 8,
	},
	subTitle: {
		opacity: 0.6,
	},
});

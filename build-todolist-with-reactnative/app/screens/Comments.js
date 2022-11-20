import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button, FlatList } from "react-native";
import socket from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommentUI from "./CommentUI";

const Comments = ({ navigation, route }) => {
	const [comment, setComment] = useState("");
	const [commentsList, setCommentsList] = useState([]);
	const [user, setUser] = useState("");

	const getUsername = async () => {
		try {
			const username = await AsyncStorage.getItem("username");
			if (username !== null) {
				setUser(username);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: route.params.title,
		});
		socket.emit("retrieveComments", route.params.id);
		getUsername();
	}, []);

	useLayoutEffect(() => {
		socket.on("displayComments", (data) => setCommentsList(data));
	}, [socket]);

	const addComment = () =>
		socket.emit("addComment", { comment, todo_id: route.params.id, user });

	return (
		<View style={styles.screen}>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					value={comment}
					onChangeText={(value) => setComment(value)}
					multiline={true}
				/>
				<Button title='Post Comment' onPress={addComment} />
			</View>

			<View>
				<FlatList
					data={commentsList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <CommentUI item={item} />}
				/>
			</View>
		</View>
	);
};

export default Comments;
const styles = StyleSheet.create({
	screen: {
		padding: 10,
	},
	form: {
		flexDirection: "row",
		marginBottom: 40,
	},
	input: {
		borderWidth: 1,
		padding: 12,
		flex: 1,
		justifyContent: "center",
	},
});

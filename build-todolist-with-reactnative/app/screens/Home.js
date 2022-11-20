import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import Todo from "./Todo";
import socket from "../utils/socket";
import ShowModal from "./ShowModal";

const Home = () => {
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);

	useLayoutEffect(() => {
		function fetchTodos() {
			fetch("http://localhost:4000/todos")
				.then((res) => res.json())
				.then((data) => setData(data))
				.catch((err) => console.error(err));
		}
		fetchTodos();
	}, []);

	useLayoutEffect(() => {
		socket.on("todos", (data) => setData(data));
	}, [socket]);

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.header}>
				<Text style={styles.heading}>Todos</Text>
				<Ionicons
					name='create-outline'
					size={30}
					color='black'
					onPress={() => setVisible(!visible)}
				/>
			</View>
			<View style={styles.container}>
				<FlatList
					data={data}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => <Todo item={item} />}
				/>
			</View>
			<ShowModal setVisible={setVisible} visible={visible} />
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		padding: 10,
		justifyContent: "space-between",
		flexDirection: "row",
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
	},
	container: {
		padding: 15,
	},
});

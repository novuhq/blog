import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import Modal from "./Modal";
import { Entypo } from "@expo/vector-icons";
import ProductUI from "./ProductUI";
import socket from "../utils/socket";

const BidPage = ({ navigation }) => {
	const [visible, setVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	const [products, setProducts] = useState([]);

	const toggleModal = (name, price, id) => {
		setVisible(true);
		setSelectedProduct({ name, price, id });
	};
	useLayoutEffect(() => {
		function fetchProducts() {
			fetch("http://localhost:4000/products")
				.then((res) => res.json())
				.then((data) => setProducts(data))
				.catch((err) => console.error(err));
		}
		fetchProducts();
	}, []);

	useEffect(() => {
		socket.on("getProducts", (data) => setProducts(data));
	}, []);

	return (
		<SafeAreaView style={styles.bidContainer}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Place Bids</Text>
				<Entypo
					name='circle-with-plus'
					size={30}
					color='green'
					onPress={() => navigation.navigate("AddProduct")}
				/>
			</View>
			<View style={styles.mainContainer}>
				<FlatList
					data={products}
					key={(item) => item.id}
					renderItem={({ item }) => (
						<ProductUI
							name={item.name}
							image_url={item.image_url}
							price={item.price}
							toggleModal={toggleModal}
							id={item.id}
						/>
					)}
				/>
			</View>
			{visible ? (
				<Modal
					visible={visible}
					setVisible={setVisible}
					selectedProduct={selectedProduct}
				/>
			) : (
				""
			)}
		</SafeAreaView>
	);
};

export default BidPage;

const styles = StyleSheet.create({
	bidContainer: {
		flex: 1,
		backgroundColor: "#fff",
	},
	headerContainer: {
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
	},
	mainContainer: {
		flex: 1,
		padding: 20,
	},
});

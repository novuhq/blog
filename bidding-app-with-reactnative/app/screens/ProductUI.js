import { View, Text, StyleSheet, Image, Button } from "react-native";
import React, { useState } from "react";

const ProductUI = ({ toggleModal, name, image_url, price, id }) => {
	return (
		<View style={styles.productContainer}>
			<Image
				style={styles.image}
				resizeMode='contain'
				source={{
					uri: image_url,
				}}
			/>
			<View style={styles.productDetails}>
				<Text style={styles.productName}>{name}</Text>
				<View>
					<Text style={styles.productPrice}>Current Price: ${price}</Text>
				</View>

				<Button
					title='Place Bid'
					onPress={() => toggleModal(name, price, id)}
				/>
			</View>
		</View>
	);
};

export default ProductUI;

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
	productContainer: {
		borderWidth: 1,
		borderColor: "#B2B2B2",
		padding: 20,
		height: 280,
		backgroundColor: "#fff",
		marginBottom: 10,
	},
	image: {
		width: "100%",
		height: "70%",
	},
	productDetails: {
		width: "100%",
		height: "30%",
		padding: 10,
		alignItems: "center",
	},
	productName: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

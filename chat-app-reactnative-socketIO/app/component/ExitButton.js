import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const ExitButton = () => {
	const navigation = useNavigation();
	return (
		<Pressable onPress={() => navigation.navigate("Login")}>
			<Ionicons name='exit-outline' size={26} color='#E14D2A' />
		</Pressable>
	);
};

export default ExitButton;
